import { APP_GUARD } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LogsModule } from 'src/logs/logs.module';
import { SystemClientModule } from 'src/system.client/system.client.module';
import { SystemConfigModule } from 'src/system.config/system.config.module';
import { SystemDashboardModule } from 'src/system.dashboard/system.dashboard.module';
import { SystemEmailsModule } from 'src/system.emails/system.emails.module';
import { SystemLogsModule } from 'src/system.logs/system.logs.module';
import { SystemVersionModule } from 'src/system.version/system.version.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => SystemClientModule),
    forwardRef(() => SystemConfigModule),
    forwardRef(() => SystemDashboardModule),
    forwardRef(() => SystemEmailsModule),
    forwardRef(() => SystemLogsModule),
    forwardRef(() => SystemVersionModule),
    LogsModule,
    ThrottlerModule.forRoot([
      // proteção conta ataque de força bruta
      {
        ttl: 60000, // tempo 1 minuto
        limit: 500, // 100 requisições
        // ignoreUserAgents: [/googlebot/],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
