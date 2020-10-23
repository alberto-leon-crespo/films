import { Body, Controller, Post } from '@nestjs/common';
import { UsersValidationPipe } from './users-validation.pipe';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('/users')
  public async postUsers(
    @Body(new UsersValidationPipe()) createUserDto: CreateUserDto
  ) {
    return await this.usersService.create(createUserDto);
  }
}
