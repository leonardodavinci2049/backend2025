import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemDashboardService } from './system.dashboard.service';
import { CreateSystemDashboardDto } from './dto/create-system.dashboard.dto';
import { UpdateSystemDashboardDto } from './dto/update-system.dashboard.dto';

@Controller('system.dashboard')
export class SystemDashboardController {
  constructor(private readonly systemDashboardService: SystemDashboardService) {}

  @Post()
  create(@Body() createSystemDashboardDto: CreateSystemDashboardDto) {
    return this.systemDashboardService.create(createSystemDashboardDto);
  }

  @Get()
  findAll() {
    return this.systemDashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemDashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemDashboardDto: UpdateSystemDashboardDto) {
    return this.systemDashboardService.update(+id, updateSystemDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemDashboardService.remove(+id);
  }
}
