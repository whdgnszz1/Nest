import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsService } from '../services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('upload')
  uploadCatImg() {
    return 'uploadImg';
  }
}
