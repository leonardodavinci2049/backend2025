import { forwardRef, Module } from '@nestjs/common';
import { SystemClientService } from './system.client.service';
import { SystemClientController } from './system.client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SystemClientController],
  providers: [SystemClientService],
  exports: [SystemClientService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
})
export class SystemClientModule {}
