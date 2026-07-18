import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Enable global route prefix
  app.setGlobalPrefix('api');
  
  // Add body size limits for bulk sales
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`NestJS Backend is running on port ${port}`);
}
bootstrap();
