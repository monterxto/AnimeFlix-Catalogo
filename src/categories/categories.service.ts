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
    return await this.repository.create(createCategoryDto);
  }

  public async findAll(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  public async findOneById(id: string): Promise<Category> {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let category: CategoryDocument;
    try {
      category = await this.repository.findOneById(_id);
    } catch (error) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  public async updateById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateWriteOpResult> {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let updated = await this.repository.updateById(_id, updateCategoryDto);
    if (!updated?.matchedCount)
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
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

  public async findAllByIds(ids: string[]): Promise<Category[]> {
    let _ids: Types.ObjectId[];
    try {
      _ids = ids.map((id) => new Types.ObjectId(id));
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    return await this.repository.findAllByIds(_ids);
  }
}
