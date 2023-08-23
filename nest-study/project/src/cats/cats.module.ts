import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // 다른 모듈에서 접근할 수 있도록 열어준다. (은닉화 된 것을 public으로 바꿔준 상태)
  exports: [CatsService],
})
export class CatsModule {}
