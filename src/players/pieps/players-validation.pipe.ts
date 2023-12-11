import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PlayersValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`The value of ${metadata.data} must be informed.`);
    }


    return value;
  }
}