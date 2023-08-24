import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from '../services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp() {
    return 'sign up';
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
