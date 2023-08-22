import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// AppService: 공급자 => app.module에서 사업자등록을 해야함.
@Controller()
// AppController: 소비자
export class AppController {
  // appService: 제품
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
