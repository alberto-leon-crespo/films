import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}