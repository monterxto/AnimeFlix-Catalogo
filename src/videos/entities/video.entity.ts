import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Transform((objectId) => objectId.value.toString())
  _id?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  yearLaunched: number;

  @Prop({ required: true })
  rating: string;

  @Prop({ required: true })
  duration: number;

  @Transform((categoriesId) =>
    categoriesId.value.map((categoryId: Types.ObjectId) =>
      categoryId.toString(),
    ),
  )
  @Prop({ required: true })
  categoriesId: any[];

  @Transform((genresId) =>
    genresId.value.map((genreId: Types.ObjectId) => genreId.toString()),
  )
  @Prop({ required: true })
  genresId: any[];

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deleted_at?: Date;

  @Prop({ default: false })
  opened?: boolean;

  @Prop({ default: null })
  videoPath: string;

  @Prop({ default: null })
  thumbnailPath: string;

  @Prop({ default: null })
  bannerPath: string;

  @Prop({ default: null })
  trailerPath: string;

  @Exclude()
  __v?: number;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}

export const VideoSchema = SchemaFactory.createForClass(Video).set(
  'timestamps',
  true,
);
