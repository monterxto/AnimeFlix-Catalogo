import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { GenresService } from '../../genres/genres.service';

export function GenresIdExists(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'GenresIdExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: GenresIdExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'GenresIdExists', async: false })
@Injectable()
export class GenresIdExistsRule implements ValidatorConstraintInterface {
  constructor( private readonly genreService: GenresService) {}

  async validate(id: string[]): Promise<boolean> {
    if (!id?.length || !Array.isArray(id)) {
      return false;
    }
    const genres = await this.genreService.findAll();
    const genreId = genres.map(genre => genre._id.toString());
    const isValid = id.every(id => genreId.includes(id));
    return isValid;
  }

  defaultMessage(): string {
    return 'Genres id is not exists';
  }
}
