import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types, UpdateWriteOpResult } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { CategoriesRepository } from './repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  public async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return new Category(await this.repository.create(createCategoryDto));
  }

  public async findAll(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  public async findOneById(id: string): Promise<Category> {
    let _id: Types.ObjectId = this.idToObjectId(id);
    let category = await this.repository.findOneById(_id);
    if (!category) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    return new Category(category);
  }

  public async updateById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    let _id: Types.ObjectId = this.idToObjectId(id);
    let updated = await this.repository.updateById(_id, updateCategoryDto);
    if (!updated?.matchedCount)
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
  }

  public async removeOneById(id: string): Promise<void> {
    let _id: Types.ObjectId = this.idToObjectId(id);
    await this.repository.removeOneById(_id);
  }

  public async removeAll(): Promise<void> {
    await this.repository.removeAll();
  }

  private idToObjectId(id: string): Types.ObjectId {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    return _id;
  }
}
