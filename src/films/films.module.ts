import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { FilmsController } from './films.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film])
  ],
  controllers: [FilmsController]
})
export class FilmsModule {}
