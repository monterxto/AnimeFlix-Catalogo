import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenresRepository } from './repository/genres.repository';

@Injectable()
export class GenresService {
  constructor(private repository: GenresRepository) {}

  public async create(createGenreDto: CreateGenreDto): Promise<any> {
    createGenreDto.categoriesId = createGenreDto.categoriesId.map(
      id => new Types.ObjectId(id),
    );
    return new Genre(await this.repository.create(createGenreDto));
  }

  public async findAll(): Promise<any> {
    return await this.repository.findAll();
  }

  public async findAllWithCategories(): Promise<any> {
    return await this.repository.findAllWithCategories();
  }

  async findOneById(id: string): Promise<any> {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let genre = await this.repository.findOneById(_id);
    if (!genre) {
      throw new HttpException(`Genre not found`, HttpStatus.NOT_FOUND);
    }
    return genre;
  }

  async updateById(id: string, updateGenreDto: UpdateGenreDto): Promise<any> {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let updated = await this.repository.updateById(_id, updateGenreDto);
    if (!updated?.matchedCount)
      throw new HttpException(`Genre not found`, HttpStatus.NOT_FOUND);
    return updated;
  }

  public async removeOneById(id: string) {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    return await this.repository.removeOneById(_id);
  }

  public async removeAll() {
    return await this.repository.removeAll();
  }
}
