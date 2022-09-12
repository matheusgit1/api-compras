import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
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
import { MyHttpModule } from '../../infrastructure/http/http.module';
import { MyHttpService } from '../../infrastructure/http/http.service';
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
    MyHttpModule,
  ],
  providers: [PurchaseService, ORMService, JwtStrategy, MyHttpService],
  controllers: [PurchaseController],
  exports: [PurchaseService, ORMService, MyHttpService],
})
export class PurchaseModule {}
