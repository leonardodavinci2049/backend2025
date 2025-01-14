import { APP_GUARD } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
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
