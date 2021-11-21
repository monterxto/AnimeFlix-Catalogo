import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category, CategoryDocument } from '../entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  public async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    let category = (
      await this.categoryModel.create(createCategoryDto)
    ).toObject();
    delete category.__v;
    return category;
  }

  public async findAll(): Promise<Category[]> {
    return await this.categoryModel.find({ isDeleted: false }).select({
      _id: 1,
      name: 1,
      description: 1,
      is_active: 1,
      createdAt: 1
    });
  }

  public async findOneById(_id: Types.ObjectId) {
    return await this.categoryModel.findOne({ _id, isDeleted: false }).select({
      _id: 1,
      name: 1,
      description: 1,
      is_active: 1,
      createdAt: 1
    });
  }

  async updateById(
    _id: Types.ObjectId,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.categoryModel.updateOne({ _id }, updateCategoryDto);
  }

  public async removeOneById(_id: Types.ObjectId): Promise<any> {
    return await this.categoryModel.updateOne(
      {
        _id,
      },
      { isDeleted: true, deleted_at: new Date(), is_active: false },
    );
  }

  public async removeAll(): Promise<UpdateWriteOpResult> {
    return await this.categoryModel.updateMany(
      {},
      { isDeleted: true, deleted_at: new Date(), is_active: false },
    );
  }

  public async findAllByIds(ids: Types.ObjectId[]): Promise<Category[]> {
    return await this.categoryModel.find({
      _id: { $in: ids },
      isDeleted: false,
    }).select({
      _id: 1,
      name: 1,
      description: 1,
      is_active: 1,
      createdAt: 1
    });
  }
}
