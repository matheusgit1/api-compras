import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { InsertInPurchaseDto } from './dtos/new-purchase.dto';
import { InsertCartDto } from './dtos/insert-cart.dto';
// import { HttpService } from '../../infrastructure/http/http.service'

@Injectable()
export class PurchaseService {
  private readonly REGEX_UUID: string =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

  constructor(
    private jwtService: JwtService,
    private readonly ormService: ORMService,
  ) // private readonly httpService: HttpService
  {}

  public async insertOneInPurchase(body: InsertInPurchaseDto, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    //do something this latter
    const purchase = await this.ormService.insertOneInPurchase(
      { ...body, token: token.split(' ')[1] },
      user.id,
    );
    return;
  }

  public async insertCart(body: InsertCartDto, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    console.log(user);

    return await this.ormService.insertOneInCart(
      body.productId,
      body.quantity,
      user.id,
    );
  }

  public async getCart(token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    return await this.ormService.getUserCart(user.id);
  }

  public async removeFromCart(productId: string, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    return await this.ormService.removeFromCart(productId, user.id);
  }

  public async getCartDetail(token: string, pagination: number) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    console.log(pagination);
    return await this.ormService.getCartDetail(user.id, pagination);
  }

  public async updateCart(productId: string, quantity: number, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    return await this.ormService.updateCart(productId, quantity, user.id);
  }

  public async getPurchases(token: string, limits: number) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    return await this.ormService.getPurchases(user.id, limits);
  }
}
