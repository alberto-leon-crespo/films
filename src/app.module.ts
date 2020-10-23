import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      retryAttempts: 6,
      retryDelay: 10000,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    PeliculasModule
  ],
  providers: [AppService],
})
export class AppModule {}
