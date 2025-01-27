import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemDashboardDto } from './create-system.dashboard.dto';

export class UpdateSystemDashboardDto extends PartialType(CreateSystemDashboardDto) {}
