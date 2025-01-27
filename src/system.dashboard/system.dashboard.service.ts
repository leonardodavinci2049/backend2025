import { Injectable } from '@nestjs/common';
import { CreateSystemDashboardDto } from './dto/create-system.dashboard.dto';
import { UpdateSystemDashboardDto } from './dto/update-system.dashboard.dto';

@Injectable()
export class SystemDashboardService {
  create(createSystemDashboardDto: CreateSystemDashboardDto) {
    return 'This action adds a new systemDashboard';
  }

  findAll() {
    return `This action returns all systemDashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemDashboard`;
  }

  update(id: number, updateSystemDashboardDto: UpdateSystemDashboardDto) {
    return `This action updates a #${id} systemDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemDashboard`;
  }
}
