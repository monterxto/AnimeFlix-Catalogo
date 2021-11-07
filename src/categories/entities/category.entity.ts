import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  description: string;
  
  @Prop({required: true})
  is_active: boolean;
    
  @Prop({default: false})
  isDeleted: boolean

  @Prop({default: null})
  deleted_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set('timestamps', true);
