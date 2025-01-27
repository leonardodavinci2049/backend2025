import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemEmailDto } from './create-system.email.dto';

export class UpdateSystemEmailDto extends PartialType(CreateSystemEmailDto) {}
