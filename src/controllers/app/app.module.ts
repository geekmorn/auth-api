import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersModule } from 'controllers/users'
import { LoggerMiddleware } from 'middleware/logger'
import { AuthModule } from 'controllers/auth'

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
