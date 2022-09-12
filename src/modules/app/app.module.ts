import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../infrastructure/interceptors/logging.interceptor';
import { PurchaseModule } from '../purchase/purchase.module';
import { PurchaseController } from '../purchase/purchase.controller';
import { PurchaseService } from '../purchase/purchase.service';
import { WishlistController } from '../wishlist/wishlist.controller';
import { WishlistModule } from '../wishlist/wishlist.module';
import { WishlistService } from '../wishlist/wishlist.service';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PurchaseModule, WishlistModule],
  controllers: [AppController, PurchaseController, WishlistController],
  providers: [
    AppService,
    PurchaseService,
    WishlistService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [JwtService, PurchaseService],
})
export class AppModule {}
