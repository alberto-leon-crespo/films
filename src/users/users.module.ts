import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import AuthConfig from '../config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AuthConfig]
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
