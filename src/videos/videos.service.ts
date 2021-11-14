import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosRepository } from './repository/videos.repository';

@Injectable()
export class VideosService {

  constructor(private repository: VideosRepository) {}
  
  public async create(createVideoDto: CreateVideoDto, video: any) {
    createVideoDto.categoriesId = createVideoDto.categoriesId.map(id => new Types.ObjectId(id));
    createVideoDto.genresId = createVideoDto.genresId.map(id => new Types.ObjectId(id));
    return await this.repository.create(createVideoDto);
  }

  public async findAll() {
    return await this.repository.findAll();
  }

  public async findOneById(id: string) {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let video = await this.repository.findOneById(_id);
    if (video) 
      return video;

    throw new HttpException(`Video not found`, HttpStatus.NOT_FOUND);
    
  }

  public async updateById(id: string, updateVideoDto: UpdateVideoDto) {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(id);
    } catch (error) {
      throw new HttpException(`Invalid id`, HttpStatus.BAD_REQUEST);
    }
    let video = await this.repository.findOneById(_id);
    if (video) 
      return await this.repository.updateById(_id, updateVideoDto);

    throw new HttpException(`Video not found`, HttpStatus.NOT_FOUND);
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
}

  // //upload video
  // public async uploadVideo(file: any) {

