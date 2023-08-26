import { MongooseModule } from '@nestjs/mongoose';
import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure() {
    const isDev: boolean = process.env.MODE === 'dev' ? true : false;
    mongoose.set('debug', isDev);
  }
}
