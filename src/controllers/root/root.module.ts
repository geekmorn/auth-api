import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'controllers/users';
import { LoggerMiddleware } from 'middleware/logger.middleware';
import { AuthenModule } from 'controllers/authen';

@Module({
  imports: [AuthenModule, UsersModule],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
