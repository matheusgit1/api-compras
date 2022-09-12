import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Delete,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { PurchaseService } from './purchase.service';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';
import { InsertInPurchaseDto } from './dtos/new-purchase.dto';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { RemoveFromCartDto } from './dtos/delete-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Controller('/v1/purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/insert')
  async insert(@Body() body: InsertInPurchaseDto, @Req() req: Request) {
    return await this.purchaseService.insertOneInPurchase(
      body,
      req.headers.authorization,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove')
  async remove(@Req() req: Request) {
    return 'by purchase';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cart/insert')
  async insertCart(@Body() body: InsertCartDto, @Req() req: Request) {
    return await this.purchaseService.insertCart(
      body,
      req.headers.authorization,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cart/list')
  async getCart(@Req() req: Request) {
    return await this.purchaseService.getCart(req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/cart/remove')
  async removeFromCart(@Body() body: RemoveFromCartDto, @Req() req: Request) {
    return await this.purchaseService.removeFromCart(
      body.productId,
      req.headers.authorization,
    );
  }

  @Patch('/cart/patch')
  async updateCart(@Body() body: UpdateCartDto, @Req() req: Request) {
    return await this.purchaseService.updateCart(
      body.productId,
      body.quantity,
      req.headers.authorization,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cart/details/:pagination')
  async getCartDetail(
    @Req() req: Request,
    @Param('pagination') limite: string,
  ) {
    return await this.purchaseService.getCartDetail(
      req.headers.authorization,
      +limite,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list/:pagination')
  async getPurchases(@Req() req: Request, @Param('pagination') limite: string) {
    return await this.purchaseService.getPurchases(
      req.headers.authorization,
      +limite,
    );
  }
}
