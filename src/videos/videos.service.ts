import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { FilesUpload } from '../@types/files_upload';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideosRepository } from './repository/videos.repository';

@Injectable()
export class VideosService {
  constructor(private repository: VideosRepository) {}

  public async create(createVideoDto: CreateVideoDto, files: FilesUpload) {
    createVideoDto.categoriesId = createVideoDto.categoriesId.map(
      (id) => new Types.ObjectId(id),
    );
    createVideoDto.genresId = createVideoDto.genresId.map(
      (id) => new Types.ObjectId(id),
    );
    return new Video(
      await this.repository.create({
        ...createVideoDto,
        ...this.getPaths(files),
      }),
    );
  }

  public async findAll(): Promise<any> {
    return await this.repository.findAll();
  }

  public async findOneById(id: string): Promise<any> {
    let _id: Types.ObjectId = this.idToObjectId(id);
    let video = await this.repository.findOneById(_id);
    if (video) return video;

    throw new HttpException(`Video not found`, HttpStatus.NOT_FOUND);
  }

  public async updateById(id: string, updateVideoDto: UpdateVideoDto) {
    let _id: Types.ObjectId = this.idToObjectId(id);
    let video = await this.repository.updateById(_id, updateVideoDto);
    if (video) return await this.repository.updateById(_id, updateVideoDto);

    throw new HttpException(`Video not found`, HttpStatus.NOT_FOUND);
  }

  public async removeOneById(id: string) {
    let _id: Types.ObjectId = this.idToObjectId(id);
    return await this.repository.removeOneById(_id);
  }

  public async removeAll() {
    return await this.repository.removeAll();
  }

  private getPaths(files: FilesUpload) {
    const paths = {
      bannerPath: files?.banner
        ? files?.banner[0]?.path?.replace('public', '')
        : null,
      videoPath: files?.video
        ? files?.video[0]?.path?.replace('public', '')
        : null,
      thumbnailPath: files?.thumbnail
        ? files?.thumbnail[0]?.path?.replace('public', '')
        : null,
      trailerPath: files?.trailer
        ? files?.trailer[0]?.path?.replace('public', '')
        : null,
    };
    return paths;
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
