import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SystemClientService } from './system.client.service';
import { CreateSystemClientDto } from './dto/create-system.client.dto';
import { UpdateSystemClientDto } from './dto/update-system.client.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SelectClientDto } from './dto/select.client.dto';

@Controller('systemclient')
export class SystemClientController {
  constructor(private readonly systemClientService: SystemClientService) {}

  @Post()
  create(@Body() createSystemClientDto: CreateSystemClientDto) {
    return this.systemClientService.create(createSystemClientDto);
  }

  @UseGuards(AuthGuard)
  @Post('v1/findMany')
  findMany(@Body() selectClientDto: SelectClientDto) {
    return this.systemClientService.findMany(selectClientDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemClientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSystemClientDto: UpdateSystemClientDto,
  ) {
    return this.systemClientService.update(+id, updateSystemClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemClientService.remove(+id);
  }
}
