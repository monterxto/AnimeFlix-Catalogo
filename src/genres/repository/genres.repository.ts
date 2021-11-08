import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { Genre, GenreDocument } from '../entities/genre.entity';

@Injectable()
export class GenresRepository {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  public async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    let Genre = (
      await this.genreModel.create(createGenreDto)
    ).toObject();
    delete Genre.__v;
    return Genre;
  }

  public async findAll() {
    return await this.genreModel.find({ isDeleted: false }).select({
      _id: 1,
      name: 1,
      is_active: 1,
    });
  }

  public async findOneById(_id: Types.ObjectId) {
    return await this.genreModel.findOne({ _id, isDeleted: false }).select({
      _id: 1,
      name: 1,
      is_active: 1,
    });
  }

  async updateById(_id: Types.ObjectId, updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.updateOne({ _id }, updateGenreDto);
  }

  public async removeOneById(_id: Types.ObjectId): Promise<any> {
    return await this.genreModel.updateOne(
      {
        _id,
      },
      { isDeleted: true, deleted_at: new Date(), is_active: false },
    );
  }
}
