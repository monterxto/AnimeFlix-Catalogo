import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';
import { CategoriesService } from '../../categories/categories.service';
import { GenresService } from '../../genres/genres.service';

export function CategoriesExistsInGenresArray(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CategoriesExistsInGenresArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CategoriesExistsInGenresArrayRule,
    });
  };
}

@ValidatorConstraint({ name: 'CategoriesExistsInGenresArray', async: true })
@Injectable()
export class CategoriesExistsInGenresArrayRule
  implements ValidatorConstraintInterface
{
  constructor(private readonly genresService: GenresService) {}

  async validate(
    categoriesId: string[],
    args: ValidationArguments,
  ): Promise<boolean> {
    const genresId = args.object['genresId'];
    if (!categoriesId?.length || !genresId?.length || !Array.isArray(categoriesId) || !Array.isArray(genresId)) {
      return false;
    }
    const genres = await this.genresService.findAll();
    const genresIdWithCategories: { genreId: string; categoriesId: string[] }[] =
      genres.map((genre) => {
        return {
          genreId: genre._id.toString(),
          categoriesId: genre.categoriesId.map((category) =>
            category._id.toString(),
          ),
        };
      });
    const isValid = genresId.every((id) =>
      genresIdWithCategories.some(
        (genre) =>
          genre.genreId === id &&
          categoriesId.some((category) =>
            genre.categoriesId.includes(category),
          ),
      ),
    );
    return isValid;
  }

  defaultMessage(): string {
    return 'Categories and genres is not related';
  }
}
