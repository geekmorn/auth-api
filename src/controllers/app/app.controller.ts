import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  greeting() {
    return {
      message: 'Welcome to the Auth API',
      details: `For documentation follow link http://localhost/doc`,
    };
  }
}
