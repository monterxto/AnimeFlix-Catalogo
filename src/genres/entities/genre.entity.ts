import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {

  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ required: true })
  categoriesId: Types.ObjectId[];

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deleted_at?: Date;
}

export const GenreSchema = SchemaFactory.createForClass(Genre).set(
  'timestamps',
  true,
);
