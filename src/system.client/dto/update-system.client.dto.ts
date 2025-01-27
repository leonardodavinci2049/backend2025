import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemClientDto } from './create-system.client.dto';

export class UpdateSystemClientDto extends PartialType(CreateSystemClientDto) {}
