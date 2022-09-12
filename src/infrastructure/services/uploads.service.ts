import { Req, Res, Injectable, BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ImageUploadService {
  arrayAdress: [];
  constructor(private jwtService: JwtService) {}

  async fileupload(@Req() req: Request, @Res() res: Response) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          throw new BadRequestException();
        }
        return res.status(200).json(req.files);
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  upload = multer({
    storage: multerS3({
      s3: new S3Client({
        region: process.env.AWS_DEFAULT_REGION,
      }),
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: async (request: Request, file, cb) => {
        const token: string = request.headers.authorization;
        const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
          secret: process.env.JWT_SECRET,
        });
        return cb(
          null,
          `${process.env.AWS_BUCKET_FOLDER_NAME}/${user.id}/${uuidv4()}-${
            file.originalname
          }`,
        );
      },
    }),
  }).array('image', 10);
}
