import { Body, Controller, Post } from '@nestjs/common';
import { UsersValidationPipe } from './users-validation.pipe';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { RequireAuthorized } from '../decorators/require-auth.decorator';

@Controller()
export class UsersController {

  constructor(private usersService: UsersService) {}

  @RequireAuthorized()
  @Post('/users')
  public async postUsers(
    @Body(new UsersValidationPipe()) createUserDto: CreateUserDto
  ) {
    return await this.usersService.create(createUserDto);
  }
}
