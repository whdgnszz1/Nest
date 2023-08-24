import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  // UseInterceptors,
} from '@nestjs/common';
// import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from '../services/cats.service';

@Controller('cats')
// @UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put()
  updateCat() {
    return 'update cat';
  }

  @Patch()
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
