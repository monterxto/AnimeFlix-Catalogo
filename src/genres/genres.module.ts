import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenresRepository } from './repository/genres.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './entities/genre.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }])],
  controllers: [GenresController],
  providers: [GenresService, GenresRepository]
})
export class GenresModule {}
