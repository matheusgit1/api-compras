import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();

  await app.listen(process.env.PORT || 3004, () => {
    console.log(`app rodando  na porta ${process.env.PORT || 3003}`);
  });
}
bootstrap();
