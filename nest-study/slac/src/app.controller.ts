import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): string {
    return 'hello';
  }

  @Post()
  getHello(): string {
    return this.appService.getHello();
  }
}
