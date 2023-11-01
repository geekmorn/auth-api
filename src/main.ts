import { NestFactory } from '@nestjs/core';
import { RootModule } from './controllers/root';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, { logger: ['log'] });
  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The auth api ...')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.use(cookieParser());

  await app.listen(80);
  logger.log(`Server successfully started on http://localhost/doc`);
}

bootstrap();
