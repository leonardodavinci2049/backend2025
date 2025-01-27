import { Module } from '@nestjs/common';
import { SystemEmailsService } from './system.emails.service';
import { SystemEmailsController } from './system.emails.controller';

@Module({
  controllers: [SystemEmailsController],
  providers: [SystemEmailsService],
  exports: [SystemEmailsService],
})
export class SystemEmailsModule {}
