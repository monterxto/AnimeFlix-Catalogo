import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenresRepository } from './repository/genres.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './entities/genre.entity';
import { CategoriesIdExistsRule } from '../commons/validations/categories_ids';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    CategoriesModule
  ],
  controllers: [GenresController],
  providers: [GenresService, GenresRepository, CategoriesIdExistsRule],
  exports: [GenresService],
})
export class GenresModule {}
