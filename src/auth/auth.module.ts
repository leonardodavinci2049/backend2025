import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/core/config';

import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: envs.APP_JWT_SECRET || 'secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
