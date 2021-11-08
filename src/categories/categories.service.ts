import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return await this.repository.create(createCategoryDto);
  }

  public async findAll() {
    return await this.repository.findAll();
  }

  async findOneById(id: string) {
    let _id: Types.ObjectId = new Types.ObjectId(id);
    return await this.repository.findOneById(_id);
  }

  async updateById(id: string, updateCategoryDto: UpdateCategoryDto) {
    let _id: Types.ObjectId = new Types.ObjectId(id);
    let updated = await this.repository.updateById(_id, updateCategoryDto);

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
