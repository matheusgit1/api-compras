import { IsUUID } from 'class-validator';

export class RemoveFromWishListDto {
  @IsUUID()
  productId: string;
}
