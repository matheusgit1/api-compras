import { Module } from '@nestjs/common';
// import { HttpClientModule, HttpClientService } from '@tresdoce/nestjs-httpclient';
import { MyHttpService } from './http.service';

@Module({
  imports: [
    // HttpClientModule.registerAsync({
    //   useFactory: () => ({
    //     timeout: 20*1000,
    //     // retries: 15,
    //     maxRedirects: 15,
    //     baseURL: process.env.API_PAYMENT
    //   }),
    // })
    // HttpModule.register({
    //   timeout: 20*1000,
    //   // retries: 15,
    //   maxRedirects: 15,
    //   baseURL: process.env.API_PAYMENT
    // }),
  ],
  exports: [MyHttpService],
  providers: [MyHttpService],
})
export class MyHttpModule {}
