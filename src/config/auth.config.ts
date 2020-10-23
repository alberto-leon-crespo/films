import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  encryptation_key: process.env.ENCRYPTATION_KEY
}));