import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
