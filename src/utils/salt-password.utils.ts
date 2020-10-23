import { HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from "crypto";

export class SaltPasswordUtils {

  public generateSalt(rounds: number = 15): string {
    if (rounds >= 15) {
      throw new HttpException(
        `${rounds} is equal or greater than 15, Must be less or equal that 15`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (typeof rounds !== 'number') {
      throw new HttpException(
        'rounds param must be a number',
        HttpStatus.BAD_REQUEST
      );
    }
    return crypto
      .randomBytes(Math.ceil(rounds / 2))
      .toString('hex')
      .slice(0, rounds);
  };

  public hashPassword(password: string, salt: string) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt: salt,
      hashedPassword: value
    };
  }
}