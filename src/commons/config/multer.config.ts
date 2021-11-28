import { HttpException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Video } from '../../videos/entities/video.entity';
@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './storage/videos',
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname == 'video') cb(null, './storage/videos');
          else if (file.fieldname == 'thumbnail')
            cb(null, './storage/thumbnails');
          else if (file.fieldname == 'trailer') cb(null, './storage/trailers');
          else if (file.fieldname == 'banner') cb(null, './storage/banners');
        },
        filename: (req, file, cb) => {
          const name = `${Date.now()}-${file.originalname.replace(' ', '_')}`;
          cb(null, name);
        },
      }),
      fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers['content-length']);
        if (file.fieldname === 'video' && file.mimetype.startsWith('video')) {
          if (fileSize <= 10737418240) cb(null, true);
          else
            cb(
              new HttpException(
                'Tamanho do video deve ser menor que 50gb!',
                400,
              ),
              false,
            );
        } else if (
          file.fieldname === 'thumbnail' &&
          file.mimetype.startsWith('image')
        ) {
          if (fileSize <= 1000000) cb(null, true);
          else
            cb(
              new HttpException(
                'Tamanho da thumbnail deve ser menor que 1mb!',
                400,
              ),
              false,
            );
        } else if (
          file.fieldname === 'trailer' &&
          file.mimetype.startsWith('video')
        ) {
          if (fileSize <= 1073741824) cb(null, true);
          else
            cb(
              new HttpException(
                'Tamanho do trailer deve ser menor que 5mb!',
                400,
              ),
              false,
            );
        } else if (
          file.fieldname === 'banner' &&
          file.mimetype.startsWith('image')
        ) {
          if (fileSize <= 10000000) cb(null, true);
          else
            cb(
              new HttpException(
                'Tamanho do banner deve ser menor que 10mb!',
                400,
              ),
              false,
            );
        }
      },
      limits: {
        fieldNameSize: 100,
      },
    };
  }
}
