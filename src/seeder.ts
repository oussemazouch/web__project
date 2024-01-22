import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as falso from '@ngneat/falso';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  await app.close();
}
bootstrap();