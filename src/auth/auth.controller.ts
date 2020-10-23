import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('/token')
  public async postToken(
    @Req() request: Request
  ) {
    const username: string = request.body['username'];
    const password: string = request.body['password'];
    const userInfo = await this.authService.checkLoginCredentials(
      username,
      password
    );
    console.log(userInfo);
  }
}
