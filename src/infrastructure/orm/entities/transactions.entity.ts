import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_transactions' })
@Injectable()
export class TransactionEntitie {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid', { name: 'co_product_id', nullable: false })
  productId?: string;

  @Column('uuid', { name: 'co_user_id', nullable: false })
  userId?: string;

  @Column('numeric', {
    name: 'co_product_quatity',
    nullable: false,
    default: 0,
  })
  quantity?: number;

  @Column('json', {
    name: 'co_transaction_details',
    nullable: false,
    default: 0,
  })
  trasactionDetail: any;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
