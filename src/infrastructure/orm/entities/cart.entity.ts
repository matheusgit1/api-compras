import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_carts' })
@Injectable()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid', { name: 'co_product_id', nullable: false })
  productId?: string;

  @Column('uuid', { name: 'co_user_id', nullable: false })
  userId?: string;

  @Column('int', { name: 'co_quantity', nullable: false, default: 1 })
  quantity?: string;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
