import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { WishListEntity } from './orm/entities/wish-list.entity';
import { ProductsExcludedEntity } from './orm/entities/product-excluded.entity';
import { PurchasesEntity } from './orm/entities/purchases.entity';
import { CartEntity } from './orm/entities/cart.entity';
import { TransactionEntitie } from './orm/entities/transactions.entity';

export default class TypeORMConfig {
  static getORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      entities: [
        WishListEntity,
        ProductsExcludedEntity,
        PurchasesEntity,
        CartEntity,
        TransactionEntitie,
      ],
    };
  }
}

export const DBClientConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (): Promise<TypeOrmModuleOptions> =>
    TypeORMConfig.getORMConfig(),
  inject: [ConfigService],
};
