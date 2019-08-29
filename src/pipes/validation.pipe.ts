import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, HttpException } from '@nestjs/common';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    let { metatype } = metadata;
    if (!metatype || this.toValidate(metatype) === false) return value;
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) throw new BadRequestException('validation failed');
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
