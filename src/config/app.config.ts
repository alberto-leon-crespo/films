import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  encryptation_key: process.env.ENCRYPTATION_KEY,
  session_duration: 3600
}));