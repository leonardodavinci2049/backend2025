import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemVersionService } from './system.version.service';
import { CreateSystemVersionDto } from './dto/create-system.version.dto';
import { UpdateSystemVersionDto } from './dto/update-system.version.dto';

@Controller('system.version')
export class SystemVersionController {
  constructor(private readonly systemVersionService: SystemVersionService) {}

  @Post()
  create(@Body() createSystemVersionDto: CreateSystemVersionDto) {
    return this.systemVersionService.create(createSystemVersionDto);
  }

  @Get()
  findAll() {
    return this.systemVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemVersionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemVersionDto: UpdateSystemVersionDto) {
    return this.systemVersionService.update(+id, updateSystemVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemVersionService.remove(+id);
  }
}
