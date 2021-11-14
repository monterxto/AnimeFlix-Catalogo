import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Types } from 'mongoose';

export function IsIdsToObjectId(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsIdsToObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsIdsToObjectIdRule,
    });
  };
}

@ValidatorConstraint({ name: 'IsIdsToObjectId', async: false })
@Injectable()
export class IsIdsToObjectIdRule implements ValidatorConstraintInterface {
  async validate(id: string[]): Promise<boolean> {
    if (!id?.length || !Array.isArray(id)) {
      return false;
    }

    const isValid = id?.every(id => Types.ObjectId.isValid(id));
    return isValid;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Ids in '${args.property}' is not valid`;
  }
}