import { Module } from '@nestjs/common';
import { ORMService } from './orm.service';
import { DBClientConfig } from '../postgre.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from './entities/wish-list.entity';
import { ProductsExcludedEntity } from './entities/product-excluded.entity';
import { PurchasesEntity } from './entities/purchases.entity';
import { CartEntity } from './entities/cart.entity';
import { ConfigModule } from '@nestjs/config';
import { MyHttpModule } from '../http/http.module';
import { MyHttpService } from '../http/http.service';
import { TransactionEntitie } from './entities/transactions.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync(DBClientConfig),
    TypeOrmModule.forFeature([
      WishListEntity,
      ProductsExcludedEntity,
      PurchasesEntity,
      CartEntity,
      TransactionEntitie,
    ]),
    MyHttpModule,
  ],
  providers: [ORMService, MyHttpService],
  exports: [ORMService, MyHttpService],
})
export class OrmModule {}
