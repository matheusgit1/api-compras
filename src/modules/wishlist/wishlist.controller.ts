import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { WishlistService } from './wishlist.service';
import { InsertInWishListDto } from './dtos/insert-in-wishlist.dto';
import { RemoveFromWishListDto } from './dtos/remove-from-wishlist.dto';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';

@Controller('/v1/purchase/wishlist')
export class WishlistController {
  constructor(private readonly wishListService: WishlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/insert')
  async insert(@Body() body: InsertInWishListDto, @Req() req: Request) {
    return this.wishListService.insertInWishList(
      body,
      req.headers.authorization,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove')
  async remove(@Body() body: RemoveFromWishListDto, @Req() req: Request) {
    return this.wishListService.removeFromWishList(
      body,
      req.headers.authorization,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async listAll(@Req() req: Request) {
    return this.wishListService.listAll(req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:pagination')
  async listWishlistInDsetail(
    @Req() req: Request,
    @Param('pagination') param: string,
  ) {
    return this.wishListService.listWishlistInDsetail(
      req.headers.authorization,
      +param,
    );
  }
}
