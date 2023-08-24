import { CatsService } from './cats/services/cats.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// AppService: 공급자 => app.module에서 사업자등록을 해야함.
@Controller()
// AppController: 소비자
export class AppController {
  // appService: 제품
  constructor(
    private readonly appService: AppService,
    // cats.module에서 exports를 해줘야만 사용 가능 ( 캡슐화 )
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
