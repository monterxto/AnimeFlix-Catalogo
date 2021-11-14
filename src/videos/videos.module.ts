import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideosRepository } from './repository/videos.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';
import { CategoriesIdExistsRule } from '../commons/validations/categories_ids';
import { CategoriesModule } from '../categories/categories.module';
import { GenresIdExistsRule } from '../commons/validations/genres_ids';
import { GenresModule } from '../genres/genres.module';
import { CategoriesExistsInGenresArrayRule } from '../commons/validations/categories_and_genres';
import { IsIdsToObjectIdRule } from '../commons/validations/is_ids_to_objectid';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from '../commons/config/multer.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfig,
    }),
    CategoriesModule,
    GenresModule,
  ],
  controllers: [VideosController],
  providers: [
    VideosService,
    VideosRepository,
    CategoriesIdExistsRule,
    GenresIdExistsRule,
    CategoriesExistsInGenresArrayRule,
    IsIdsToObjectIdRule
  ],
})
export class VideosModule {}
