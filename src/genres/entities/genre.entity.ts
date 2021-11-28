import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Transform((objectId) => objectId.value.toString())
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ required: true, ref: 'Category' })
  categoriesId: Types.ObjectId[];

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deleted_at?: Date;

  @Exclude()
  __v?: number;

  constructor(partial: Partial<Genre>) {
    Object.assign(this, partial);
  }
}

export const GenreSchema = SchemaFactory.createForClass(Genre).set(
  'timestamps',
  true,
);
