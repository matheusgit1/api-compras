import {
  IsUUID,
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsCreditCard,
} from 'class-validator';

export class InsertInPurchaseDto {
  @IsUUID('all', { message: 'id de produtos de ser um valor válido' })
  productId: string;

  @IsNumber(
    { allowNaN: false },
    { message: 'parcelas deve ser um valor numérico' },
  )
  @IsInt({ message: "'parcelas' deve ser um valor numérico inteiro" })
  installments: number;

  @IsNumber(
    { allowNaN: false },
    { message: 'quantidade deve ser um valor numerico' },
  )
  @IsInt({ message: "'quantidade' deve ser um valor numérico inteiro" })
  amount: number;

  @IsUUID('all', { message: 'id de produtos deve ser um valor válido' })
  adressId: string;

  @IsCreditCard({ message: 'cartão de crédito inválido' })
  creditCard: string;

  @IsNumber(
    { allowNaN: false },
    { message: 'mês deve ser um valor numérico inteiro' },
  )
  @IsInt({ message: 'mês deve ser um valor numérico inteiro' })
  mouth: number;

  @IsNumber(
    { allowNaN: false },
    { message: 'ano deve ser um valor numérico inteiro' },
  )
  @IsInt({ message: 'ano deve ser um valor numérico inteiro' })
  expYear: number;

  @IsNumber(
    { allowNaN: false },
    { message: 'cvc deve ser um valor numérico inteiro' },
  )
  @IsInt({ message: 'cvc deve ser um valor numérico inteiro' })
  cvc: number;
}
