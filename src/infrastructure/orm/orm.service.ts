import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { WishListEntity } from './entities/wish-list.entity';
import { PurchasesEntity } from './entities/purchases.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyHttpService } from '../http/http.service';

@Injectable()
export class ORMService {
  constructor(
    @InjectRepository(WishListEntity)
    private readonly ormServiceWishList: Repository<WishListEntity>,

    @InjectRepository(WishListEntity)
    private readonly ormServicePurchase: Repository<PurchasesEntity>,

    private readonly httpService: MyHttpService,
  ) {}

  public async insertInWishList(
    productId: string,
    userId: string,
  ): Promise<void> {
    const sql = `
      insert into tb_wish_list (co_product_id, co_user_id) values($1,$2)
    `;
    const inWishList = await this.ormServiceWishList.query(sql, [
      productId,
      userId,
    ]);
    return inWishList;
  }

  public async removeFromWisListt(
    productId: string,
    userId: string,
  ): Promise<void> {
    const sql = `
      delete from tb_wish_list where co_product_id = $1 and co_user_id = $2
    `;
    await this.ormServiceWishList.query(sql, [productId, userId]);
    return;
  }

  public async insertOneInPurchase(
    purchase: {
      productId: string;
      installments: number;
      amount: number;
      adressId: string;
      creditCard: string;
      mouth: number;
      expYear: number;
      cvc: number;
      token: string;
    },
    userId: string,
  ) {
    const product = await this.ormServiceWishList.query(
      `select * from tb_product where id = $1`,
      [purchase.productId],
    );
    // return await this.ormServiceWishList.query('select * from tb_wish_list where co_user_id = $1',[userId])
    if (product.length === 0) {
      throw new NotFoundException('Produto não econtrado');
    }

    if (
      !product[0].co_is_product_active ||
      +product[0].co_product_stocks <= 0
    ) {
      throw new BadRequestException(
        'Produto não está disponivel para comercialização ou sem estoques',
      );
    }

    if (+product[0].co_product_stocks < purchase.amount) {
      throw new BadRequestException('Sem estoque para demanda');
    }

    //insert purchase relation ship into database table tb_purchases
    const sql = `
      insert into tb_purchases (
        co_product_id,
        co_product_name,
        co_product_price,
        co_product_description,
        co_product_categories,
        co_product_main_categories,
        co_product_installments,
        co_produdct_installment_price,
        co_product_images,
        co_user_id,
        co_product_discount,
        co_product_marc,
        co_product_conditions,
        co_product_features,
        co_product_seller,
        co_product_seller_id,
        co_five_stars,
        co_four_stars,
        co_three_stars,
        co_two_stars,
        co_one_stars,
        co_zero_stars,
        co_purchase_total,
        co_purchase_amount
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21,
        $22,
        $23,
        $24
      )
    `;
    await this.ormServicePurchase.query(sql, [
      product[0].id,
      product[0]?.co_product_name,
      +product[0]?.co_product_price,
      product[0]?.co_product_description,
      product[0]?.co_product_categories,
      product[0]?.co_product_main_categories,
      3,
      79.66,
      product[0]?.co_product_images,
      userId,
      +product[0]?.co_product_discount,
      product[0]?.co_product_marc,
      product[0]?.co_product_conditions,
      JSON.stringify(product[0]?.co_product_features[0]),
      product[0]?.co_product_seller,
      product[0]?.co_user_id,
      product[0]?.co_five_stars,
      product[0]?.co_four_stars,
      product[0]?.co_three_stars,
      product[0]?.co_two_stars,
      product[0]?.co_one_stars,
      product[0]?.co_zero_stars,
      purchase.amount * +product[0]?.co_product_price,
      purchase.amount,
    ]);

    //set a new stckos refered to this purchase
    await this.ormServicePurchase.query(
      `
      update tb_product set co_product_stocks = (
        select tp.co_product_stocks
        from tb_product tp
        where tp.id = $1) - $2
      where id = $3
    `,
      [purchase.productId, purchase.amount, purchase.productId],
    );

    //remove purchase from user in tb_carts
    await this.ormServicePurchase.query(
      `
      delete from tb_carts tc where tc.co_user_id = $1
    `,
      [userId],
    );

    //remove these comments to record transaction and payment
    // const response = await this.httpService.registerPayment({
    //   total: product[0].co_product_price*100, //em centavos
    //   productId: purchase.productId,
    //   adressId: purchase.adressId,
    //   creditCard: purchase.creditCard,
    //   mouth: purchase.mouth,
    //   expYear: purchase.expYear,
    //   cvc: purchase.cvc,
    //   token: purchase.token,
    // })

    //registra pagamatno na api de pagamento

    return;
  }

  public async listAll(userId: string) {
    const all = await this.ormServiceWishList.query(
      `
      select co_product_id from tb_wish_list where co_user_id = $1
    `,
      [userId],
    );

    return all;
  }

  public async insertOneInCart(
    productId: string,
    quantity: number,
    userId: string,
  ) {
    await this.ormServiceWishList.query(
      `
      insert into tb_carts (
        co_product_id,
        co_quantity,
        co_user_id
      ) values (
        $1,
        $2,
        $3
      )
    `,
      [productId, quantity, userId],
    );

    return;
  }

  public async getUserCart(userId) {
    const listCart = await this.ormServiceWishList.query(
      `
      select * from tb_carts tc INNER JOIN tb_product tp ON tp.id = tc.co_product_id where tc.co_user_id = $1
    `,
      [userId],
    );
    /*
    
     */

    const realPurchase: Array<any> = [];

    for (const index in listCart) {
      const isInProductTable: Array<any> = await this.ormServiceWishList.query(
        `
        select id from tb_product where id = $1
      `,
        [listCart[index].co_product_id],
      );

      if (isInProductTable.length > 0) {
        realPurchase.push(listCart[index]);
      }
    }

    // console.log(realPurchase)

    return realPurchase;
  }

  public async removeFromCart(pruductId: string, userId: string) {
    await this.ormServiceWishList.query(
      `
    delete from tb_carts where co_product_id = $1 and co_user_id = $2
    `,
      [pruductId, userId],
    );

    return;
  }

  public async getCartDetail(userId: string, limit: number) {
    const cartDetails = await this.ormServiceWishList.query(
      `
      SELECT * FROM tb_product tp
        INNER JOIN tb_carts tc 
          ON tp.id = tc.co_product_id
          and tc.co_user_id = $1
        OFFSET $2 FETCH NEXT 10 ROWS ONLY

    `,
      [userId, limit * 10],
    );

    return cartDetails;
  }

  public async listWishlistInDsetail(userId: string, limit: number) {
    const wishListDetails = await this.ormServiceWishList.query(
      `
      SELECT * FROM tb_product tp
        INNER JOIN tb_wish_list tw 
          ON tp.id = tw.co_product_id
          and tw.co_user_id = $1
        OFFSET $2 FETCH NEXT 10 ROWS ONLY

    `,
      [userId, limit * 10],
    );

    return wishListDetails;
  }

  public async updateCart(productId: string, quantity: number, userId: string) {
    await this.ormServiceWishList.query(
      `
      update tb_carts
      set co_quantity = $1
      where co_user_id = $2 and co_product_id = $3 
    `,
      [quantity, userId, productId],
    );

    return;
  }

  public async getPurchases(userId, limits) {
    const purchaseList = await this.ormServiceWishList.query(
      `
      select * from tb_purchases tp
      where tp.co_user_id  = $1 
      order by tp.co_created_at desc
      
    `,
      [userId],
    ); //limits*10
    // offset $2 fetch next 10 rows only

    return purchaseList;
  }
}
