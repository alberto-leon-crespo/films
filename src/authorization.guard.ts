import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const salt = this.configService.get('app.encryptation_key');
    const requireAuthorized = this.reflector.get<string[]>('RequireAuthorized', context.getHandler());
    const token = request.headers['authorization'].replace('Bearer ', '')
    if (token && requireAuthorized) {
      try {
        const payload = jwt.verify(token, salt);
        request['user_context'] = payload;
      } catch (e) {
        throw new HttpException(
          'Invalid credentials.',
          HttpStatus.UNAUTHORIZED
        )
      }
      return true;
    } else if (!token && requireAuthorized) {
      throw new HttpException(
        'Invalid credentials.',
        HttpStatus.UNAUTHORIZED
      )
    } else {
      return true;
    }
  }
}
