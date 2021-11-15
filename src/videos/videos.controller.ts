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
} from '@nestjs/common';
import { Response } from 'express';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  AnyFilesInterceptor,
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
      { name: 'videoFile', maxCount: 1 },
      { name: 'thumbFile', maxCount: 1 },
      { name: 'bannerFile', maxCount: 1 },
      { name: 'trailerFile', maxCount: 1 },
    ]),
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'videoFile', maxCount: 1 },
      { name: 'thumbFile', maxCount: 1 },
      { name: 'bannerFile', maxCount: 1 },
      { name: 'trailerFile', maxCount: 1 },
    ]),
  )
  async updateById(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @Res() response: Response,
    @UploadedFiles() files: FilesUpload,
  ): Promise<any> {
    await this.videosService.updateById(id, updateVideoDto, files);
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
