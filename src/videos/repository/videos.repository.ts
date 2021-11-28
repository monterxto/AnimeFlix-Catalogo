import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { Video, VideoDocument } from '../entities/video.entity';

@Injectable()
export class VideosRepository {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  public async create(createVideoDto: CreateVideoDto): Promise<Video> {
    return (await this.videoModel.create(createVideoDto)).toObject();
  }

  public async findAll() {
    return await this.videoModel.find({ isDeleted: false }).select({
      _id: 1,
      title: 1,
      year_launched: 1,
      rating: 1,
      duration: 1,
      categories_id: 1,
    });
  }

  public async findOneById(_id: Types.ObjectId) {
    return await this.videoModel.findOne({ _id, isDeleted: false }).select({
      _id: 1,
      year_launched: 1,
      rating: 1,
      duration: 1,
      categories_id: 1,
    });
  }

  async updateById(_id: Types.ObjectId, updateVideoDto: UpdateVideoDto) {
    return await this.videoModel.updateOne({ _id }, updateVideoDto);
  }

  public async removeOneById(_id: Types.ObjectId): Promise<any> {
    return await this.videoModel.updateOne(
      {
        _id,
      },
      { isDeleted: true, deleted_at: new Date(), is_active: false },
    );
  }

  public async removeAll(): Promise<any> {
    return await this.videoModel.updateMany(
      {},
      { isDeleted: true, deleted_at: new Date(), is_active: false },
    );
  }
}
