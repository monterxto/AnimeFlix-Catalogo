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
  UploadedFiles,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesUpload } from '../@types/files_upload';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'trailer', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
    ClassSerializerInterceptor,
  )
  async create(
    @UploadedFiles() files: FilesUpload,
    @Body() createVideoDto: CreateVideoDto,
  ): Promise<any> {
    return this.videosService.create(createVideoDto, files);
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
