import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AuthorizationGuard } from './authorization.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const reflector = await app.resolve<Reflector>(Reflector);
  const config = await app.resolve<ConfigService>(ConfigService);
  app.useGlobalGuards(new AuthorizationGuard(reflector, config))
  await app.listen(3000);
}
bootstrap();
