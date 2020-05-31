import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidatePipe implements PipeTransform {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        console.log(errors);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed. ' + errors.map(error => JSON.stringify(error.constraints)).join("."));
        }

        return value;
    }


    private toValidate(metatype: Function) {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
