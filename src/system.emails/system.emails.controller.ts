import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemEmailsService } from './system.emails.service';
import { CreateSystemEmailDto } from './dto/create-system.email.dto';
import { UpdateSystemEmailDto } from './dto/update-system.email.dto';

@Controller('system.emails')
export class SystemEmailsController {
  constructor(private readonly systemEmailsService: SystemEmailsService) {}

  @Post()
  create(@Body() createSystemEmailDto: CreateSystemEmailDto) {
    return this.systemEmailsService.create(createSystemEmailDto);
  }

  @Get()
  findAll() {
    return this.systemEmailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemEmailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemEmailDto: UpdateSystemEmailDto) {
    return this.systemEmailsService.update(+id, updateSystemEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemEmailsService.remove(+id);
  }
}
