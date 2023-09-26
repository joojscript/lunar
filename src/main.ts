import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as loadEnvVariables } from 'dotenv';
import { AppModule } from './app.module';
import { verifyScannerIsPresent } from './helpers/scanner';

loadEnvVariables();
verifyScannerIsPresent();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
