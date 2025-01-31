import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('VALUE_PIPE', value, 'metadata_PIPE', metadata);
    return value;
  }
}
