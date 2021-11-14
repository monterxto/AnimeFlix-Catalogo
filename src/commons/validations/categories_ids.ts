import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CategoriesService } from '../../categories/categories.service';

export function CategoriesIdExists(
  validationOptions?: any,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CategoriesIdExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CategoriesIdExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'CategoriesIdExists', async: false })
@Injectable()
export class CategoriesIdExistsRule implements ValidatorConstraintInterface {
  constructor( private readonly categoryService: CategoriesService) {}

  async validate(id: string[]): Promise<boolean> {
    if (!id?.length || !Array.isArray(id)) {
      return false;
    }
    const categories = await this.categoryService.findAll();
    const categoryIds = categories.map(category => category._id.toString());
    const isValid = id.every(id => categoryIds.includes(id));
    return isValid;
  }

  defaultMessage(): string {
    return 'Categories ids is not exists';
  }
}