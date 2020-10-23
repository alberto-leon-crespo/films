import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SaltPasswordUtils } from '../utils/salt-password.utils';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/token')
  public async postToken(
    @Req() request: Request
  ) {
    const username: string = request.body['username'];
    const password: string = request.body['password'];
    const cryptoLibrary = new SaltPasswordUtils();
    return {
      salt: cryptoLibrary.generateSalt(15)
    }
  }
}
