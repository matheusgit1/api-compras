import { Injectable, BadRequestException } from '@nestjs/common';
// import { HttpClientService } from '@tresdoce/nestjs-httpclient';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class MyHttpService {
  private httpClient: AxiosInstance;
  constructor() // private httpClient: HttpClientService
  // private readonly httpClient: HttpClientService
  {
    this.httpClient = axios.create({
      timeout: 20 * 1000,
      baseURL: process.env.API_PAYMENT,
    });
  }

  public async registerPayment(body: {
    total: number;
    productId: string;
    adressId: string;
    creditCard: string;
    mouth: number;
    expYear: number;
    cvc: number;
    token: string;
  }) {
    try {
      console.log(body.token);
      const { data, status } = await this.httpClient.post(
        '/payments/create/payment',
        {
          total: Math.round(+body.total),
          productId: body.productId,
          adressId: body.adressId,
          creditCard: body.creditCard,
          mouth: +body.mouth,
          expYear: +body.expYear,
          cvc: +body.cvc,
        },
        {
          headers: { Authorization: `Bearer ${body.token}` },
        },
      );

      console.log('data: ', data);

      return data;
    } catch (error: any) {
      throw new BadRequestException('Erro ao registrar pagamento');
    }
  }
}
