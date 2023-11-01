import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'controllers/users';
import { LoggerMiddleware } from 'middleware/logger.middleware';
import { AppController } from './app.controller';
import { AuthenModule } from 'controllers/authen';

@Module({
  imports: [AuthenModule, UsersModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
