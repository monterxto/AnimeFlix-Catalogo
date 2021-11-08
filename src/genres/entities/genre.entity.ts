import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {
  @Prop({required: true})
  name: string;
  
  @Prop({default: true})
  is_active: boolean;
    
  @Prop({default: false})
  isDeleted: boolean

  @Prop({default: null})
  deleted_at: Date;
}

export const GenreSchema = SchemaFactory.createForClass(Genre).set('timestamps', true);
