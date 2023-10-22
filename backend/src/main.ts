import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
    origin: '*', 
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"]
  });

  await app.listen(3001);
}
bootstrap();
