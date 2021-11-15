import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsMimeType,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { CategoriesExistsInGenresArray } from '../../commons/validations/categories_and_genres';
import { CategoriesIdExists } from '../../commons/validations/categories_ids';
import { GenresIdExists } from '../../commons/validations/genres_ids';
import { IsIdsToObjectId } from '../../commons/validations/is_ids_to_objectid';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Max(2021)
  @Min(1970)
  @IsNotEmpty()
  yearLaunched: number;

  @IsBoolean()
  @IsOptional()
  opened: boolean = false;

  @IsString()
  @IsNotEmpty()
  @IsIn(['L', '10', '12', '14', '16', '18'])
  rating: string;

  @Type(() => Number)
  @IsNumber()
  @Max(40)
  @Min(1)
  @IsNotEmpty()
  duration: number;

  @IsArray()
  @ArrayUnique()
  @IsIdsToObjectId()
  @CategoriesIdExists()
  @CategoriesExistsInGenresArray()
  @IsNotEmpty()
  categoriesId: any[];

  @IsArray()
  @ArrayUnique()
  @IsIdsToObjectId()
  @GenresIdExists()
  @IsNotEmpty()
  genresId: any[];
}
