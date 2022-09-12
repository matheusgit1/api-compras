import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { InsertInWishListDto } from '../wishlist/dtos/insert-in-wishlist.dto';
import { RemoveFromWishListDto } from '../wishlist/dtos/remove-from-wishlist.dto';

@Injectable()
export class WishlistService {
  private readonly REGEX_UUID: string =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

  constructor(
    private jwtService: JwtService,
    private readonly ormService: ORMService,
  ) {}

  public async insertInWishList(body: InsertInWishListDto, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    await this.ormService.insertInWishList(body.productId, user.id);
    return;
  }

  public async removeFromWishList(body: RemoveFromWishListDto, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    return await this.ormService.removeFromWisListt(body.productId, user.id);
  }

  public async listAll(token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    console.log(user.id);
    return await this.ormService.listAll(user.id);
  }

  public async listWishlistInDsetail(token: string, pagination: number) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    console.log(user.id);
    return await this.ormService.listWishlistInDsetail(user.id, pagination);
  }
}
