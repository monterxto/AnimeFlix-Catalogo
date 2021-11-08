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
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Res() response: Response) {
    let result = await this.categoriesService.findAll();
    if (!result.length) response.status(HttpStatus.NO_CONTENT).send();
    else response.status(HttpStatus.OK).send(result);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string, @Res() response: Response) {
    let result = await this.categoriesService.findOneById(id);
    if (!result) response.status(HttpStatus.NO_CONTENT).send();
    else response.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() response: Response,
  ) {
    let result = await this.categoriesService.updateById(id, updateCategoryDto);
    if (result)
      response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Item atualizado com sucesso!',
      });
    else response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async removeOneById(@Param('id') id: string, @Res() response: Response) {
    let result = await this.categoriesService.removeOneById(id);
    if (result)
      response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Item removido com sucesso!',
      });
    else response.status(HttpStatus.NO_CONTENT).send();
  }
}
