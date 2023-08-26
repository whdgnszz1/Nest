import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DmsService } from '../services/dms.service';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @Get(':id/chats')
  getChat(@Query('perPage') perPage, @Query('page') page, @Param() param) {
    console.log(perPage, page);
    console.log(param);
    return 'getChat';
  }

  @Post(':id/chats')
  postChat(@Body() body) {
    return 'postChat';
  }
}
