import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
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

  @Prop({ required: true })
  categoriesId: any[];
  
  @Prop({ required: true })
  genresId: any[];

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deleted_at?: Date;

  @Prop({ default: false })
  opened?: boolean;
  
  @Prop({ default: null })
  bannerFilePath?: string;

  @Prop({ default: null })
  videoFilePath?: string;

  @Prop({ default: null })
  thumbFilePath?: string;

  @Prop({ default: null })
  traillerFilePath?: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video).set(
  'timestamps',
  true,
);