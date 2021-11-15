import { HttpException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'videoFile') {
            cb(null, './storage/videos');
          } else if (file.fieldname === 'thumbFile') {
            cb(null, './storage/thumbnails');
          } else if (file.fieldname === 'bannerFile') {
            cb(null, './storage/banners');
          } else if (file.fieldname === 'trailerFile') {
            cb(null, './storage/trailers');
          }
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + file.originalname.replace(/\s/g, '_');
          cb(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, cb) => {
        const videoTypes = /mp4|avi|mkv/;
        const imageTypes = /jpg|jpeg|png|gif/;
        if (file.fieldname === 'videoFile') {
          const isVideo = !!file.mimetype.match(videoTypes);
          const fileSizeLimit =
            parseInt(req.headers['content-length']) < 50000000000; //50GB
          if (isVideo && fileSizeLimit) cb(null, true);
          else
            cb(
              new HttpException(
                'File upload only supports the following filetypes - ' +
                  videoTypes,
                400,
              ),
              false,
            );
        } else if (file.fieldname === 'thumbFile') {
          const isImage = !!file.mimetype.match(imageTypes);
          const fileSizeLimit =
            parseInt(req.headers['content-length']) < 5000000; //5MB
          if (isImage && fileSizeLimit) cb(null, true);
          else
            cb(
              new HttpException(
                'File upload only supports the following filetypes - ' +
                  imageTypes,
                400,
              ),
              false,
            );
        } else if (file.fieldname === 'bannerFile') {
          const isImage = !!file.mimetype.match(imageTypes);
          const fileSizeLimit =
            parseInt(req.headers['content-length']) < 10000000; //10MB
          if (isImage && fileSizeLimit) cb(null, true);
          else
            cb(
              new HttpException(
                'File upload only supports the following filetypes - ' +
                  imageTypes,
                400,
              ),
              false,
            );
        } else if (file.fieldname === 'trailerFile') {
          const isVideo = !!file.mimetype.match(videoTypes);
          const fileSizeLimit =
            parseInt(req.headers['content-length']) < 1000000000; //1GB
          if (isVideo && fileSizeLimit) cb(null, true);
          else
            cb(
              new HttpException(
                'File upload only supports the following filetypes - ' +
                  videoTypes,
                400,
              ),
              false,
            );
        }
      },
    };
  }
}
