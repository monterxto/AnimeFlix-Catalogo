import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoriesIdExists } from '../../commons/validations/categories_ids';
import { IsIdsToObjectId } from '../../commons/validations/is_ids_to_objectid';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsArray()
  @IsIdsToObjectId()
  @CategoriesIdExists()
  @IsNotEmpty()
  categoriesId: any[];
}
