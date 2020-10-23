import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  public async checkLoginCredentials(username: string, password: string) {
    return await this.usersService.login(
      username,
      password
    );
  }
}
