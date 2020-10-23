import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SaltPasswordUtils } from '../utils/salt-password.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {}

  public async checkLoginCredentials(username: string, password: string) {
    const saltPasswordUtils = new SaltPasswordUtils();
    const salt = this.configService.get('auth.encryptation_key');
    const saltedPassword = saltPasswordUtils.hashPassword(password, salt);
    return await this.usersService.login(
      username,
      saltedPassword.hashedPassword
    );
  }
}
