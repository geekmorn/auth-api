import { NestFactory } from '@nestjs/core';
import { RootModule } from './controllers/root';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { env } from '../env';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { logger: ['log'] });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The auth api ...')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.use(cookieParser());
  await app.listen(env.APP_PORT);
}

bootstrap();
