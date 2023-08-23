import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { PositiveIntPipe } from './../common/pipes/positiveint.pipe';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter)
  getAllCat() {
    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  // pipe를 사용하여 validation error까지 출력 가능
  // parameter 데이터가 들어오면 유효성검사 실행
  // pipe에 넣어 변환, 실패하였을 경우 exception으로 빠지게 됨.
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
