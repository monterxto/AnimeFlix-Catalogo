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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto): Promise<any> {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  async findAll(@Res() response: Response): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.genresService.findAll());
  }

  @Get('withcategories')
  async findAllWithCategories(@Res() response: Response): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.genresService.findAllWithCategories());
  }

  @Get('withcategories/:id')
  async findOneByIdWithCategories(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.genresService.findOneByIdWithCategories(id));
  }

  @Get(':id')
  async findOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.genresService.findOneById(id));
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.genresService.updateById(id, updateGenreDto);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async removeOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    await this.genresService.removeOneById(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete()
  async removeAll(@Res() response: Response): Promise<any> {
    await this.genresService.removeAll();
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
