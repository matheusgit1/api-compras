import { Module } from '@nestjs/common';
import { ImageUploadService } from './uploads.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [ImageUploadService, JwtStrategy],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
