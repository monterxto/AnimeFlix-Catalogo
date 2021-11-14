import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deleted_at?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'timestamps',
  true,
);
