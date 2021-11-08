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
  async create(@Body() createGenreDto: CreateGenreDto) {
    return await this.genresService.create(createGenreDto);
  }

  @Get()
  async findAll(@Res() response: Response) {
    let result = await this.genresService.findAll();
    if (!result.length) response.status(HttpStatus.NO_CONTENT).send();
    else response.status(HttpStatus.OK).send(result);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string, @Res() response: Response) {
    let result = await this.genresService.findOneById(id);
    if (!result) response.status(HttpStatus.NO_CONTENT).send();
    else response.status(HttpStatus.OK).send(result);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @Res() response: Response,
  ) {
    let result = await this.genresService.updateById(id, updateGenreDto);
    if (result)
      response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Item atualizado com sucesso!',
      });
    else response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async removeOneById(@Param('id') id: string, @Res() response: Response) {
    let result = await this.genresService.removeOneById(id);
    if (result)
      response.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Item removido com sucesso!',
      });
    else response.status(HttpStatus.NO_CONTENT).send();
  }
}
