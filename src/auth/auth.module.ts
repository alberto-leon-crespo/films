import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig]
    }),
    UsersModule
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
