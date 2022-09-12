import { IsUUID } from 'class-validator';

export class InsertInWishListDto {
  @IsUUID()
  productId: string;
}
