import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as loadEnvVariables } from 'dotenv';
import { AppModule } from './app.module';
import { verifyScannerIsPresent } from './helpers/scanner';

loadEnvVariables();
verifyScannerIsPresent();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
