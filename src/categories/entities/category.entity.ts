import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform((objectId) => objectId.value.toString())
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  is_active: boolean;

  @Exclude()
  @Prop({ default: false })
  isDeleted?: boolean;

  @Exclude()
  @Prop({ default: null })
  deleted_at?: Date;

  @Exclude()
  __v?: number;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'timestamps',
  true,
);
