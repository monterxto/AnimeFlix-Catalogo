import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response, Send } from 'express';
import { UpdateQuery } from 'mongoose';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Res() response: Response): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.categoriesService.findAll());
  }

  @Get(':id')
  async findOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.categoriesService.findOneById(id));
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() response: Response,
  ): Promise<Response> {
    await this.categoriesService.updateById(id, updateCategoryDto);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async removeOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    await this.categoriesService.removeOneById(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete()
  async removeAll(@Res() response: Response): Promise<Response> {
    await this.categoriesService.removeAll();
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
