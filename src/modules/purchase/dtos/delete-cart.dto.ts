import { IsUUID, IsNumber, IsInt } from 'class-validator';

export class RemoveFromCartDto {
  @IsUUID('all', { message: 'id de produto deve ser um tipo válido' })
  productId?: string;
}
