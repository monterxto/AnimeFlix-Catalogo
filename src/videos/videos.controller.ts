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
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('videoFile'))
  async create(@UploadedFile() video: Express.Multer.File, @Body() createVideoDto: CreateVideoDto): Promise<any> {
    return this.videosService.create(createVideoDto, video);
  }

  @Get()
  async findAll(@Res() response: Response): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.videosService.findAll());
  }

  @Get(':id')
  async findOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    return response
      .status(HttpStatus.OK)
      .send(await this.videosService.findOneById(id));
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.videosService.updateById(id, updateVideoDto);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async removeOneById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    await this.videosService.removeOneById(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete()
  async removeAll(@Res() response: Response): Promise<any> {
    await this.videosService.removeAll();
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
