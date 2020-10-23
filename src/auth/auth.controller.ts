import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Post('/token')
  public async postToken(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const username: string = request.body['username'];
    const password: string = request.body['password'];
    const userInfo = await this.authService.checkLoginCredentials(
      username,
      password
    );
    console.log(userInfo);
    if (userInfo) {
      const salt = this.configService.get('app.encryptation_key');
      const sessionExpiration = this.configService.get('app.session_duration');
      const payload = {
        id: userInfo.id,
        exp: Math.floor(Date.now() / 1000) + sessionExpiration
      };
      response.contentType('application/json');
      response.status(200).end(JSON.stringify({
        type: 'Bearer',
        exp: Math.floor(Date.now() / 1000) + sessionExpiration,
        token: jwt.sign(payload, salt)
      }));
    }
  }
}
