import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  public async checkLoginCredentials(username: string, password: string): Promise<User> {
    return await this.usersService.login(
      username,
      password
    );
  }
}
