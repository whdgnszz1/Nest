import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  // 다른 모듈에서 접근할 수 있도록 열어준다. (은닉화 된 것을 public으로 바꿔준 상태)
  exports: [CatsService],
})
export class CatsModule {}
