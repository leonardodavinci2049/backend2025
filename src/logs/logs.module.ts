import { forwardRef, Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LogsController],
  providers: [LogsService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
})
export class LogsModule {}
