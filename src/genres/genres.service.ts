import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenresRepository } from './repository/genres.repository';

@Injectable()
export class GenresService {
  constructor(private repository: GenresRepository) {}

  public async create(createGenreDto: CreateGenreDto) {
    return await this.repository.create(createGenreDto);
  }

  public async findAll() {
    return await this.repository.findAll();
  }

  async findOneById(id: string) {
    let _id: Types.ObjectId = new Types.ObjectId(id);
    return await this.repository.findOneById(_id);
  }

  async updateById(id: string, updateGenreDto: UpdateGenreDto) {
    let _id: Types.ObjectId = new Types.ObjectId(id);
    let updated = await this.repository.updateById(_id, updateGenreDto);

    if (updated.modifiedCount > 0) return true;

    return false;
  }

  public async removeOneById(id: string) {
    let _id: Types.ObjectId = new Types.ObjectId(id);
    let removed = await this.repository.removeOneById(_id);

    if (removed.modifiedCount > 0) return true;

    return false;
  }
}
