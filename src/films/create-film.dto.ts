import { IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  gender: string;

  @IsString()
  poster: string;
}