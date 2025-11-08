import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // "https://gleaming-moxie-c073d0.netlify.app"
  // https://gleaming-moxie-c073d0.netlify.app
  app.enableCors({
    origin: [
      'https://gleaming-moxie-c073d0.netlify.app',
      'http://localhost:5173',
    ],
    credentials: true, // for send cookies
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  });

  // for reading
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
