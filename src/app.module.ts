import { Module } from '@nestjs/common';
import { UsersModule } from 'controllers/users';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
