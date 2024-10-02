import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Logger setup
  const logger = new Logger('Bootstrap');
  logger.log('Application is starting...');

  await app.listen(5000);
  logger.log('Application is running on: http://localhost:5000');
}
bootstrap();
