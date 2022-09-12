import { IsUUID, IsNumber, IsInt } from 'class-validator';

export class InsertCartDto {
  @IsUUID('all', { message: 'id de produto deve ser um tipo válido' })
  productId?: string;

  @IsNumber({}, { message: 'campo qunatidade deve ser um dado numérico' })
  @IsInt({ message: 'campo quantidade deve ser um valor inteiro' })
  quantity: number;
}
