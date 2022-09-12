import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from '../../infrastructure/orm/entities/wish-list.entity';
import { ProductsExcludedEntity } from '../../infrastructure/orm/entities/product-excluded.entity';
import { PurchasesEntity } from '../../infrastructure/orm/entities/purchases.entity';
import { JwtModule } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { OrmModule } from '../../infrastructure/orm/orm.module';
import { JwtStrategy } from '../../infrastructure/jwt/jwt.strategy';
import { ImageUploadModule } from '../../infrastructure/services/upload.module';

export class PurchaseModule {}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      WishListEntity,
      ProductsExcludedEntity,
      PurchasesEntity,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    OrmModule,
    ImageUploadModule,
  ],
  providers: [WishlistService, ORMService, JwtStrategy],
  controllers: [WishlistController],
  exports: [WishlistService, ORMService],
})
export class WishlistModule {}
