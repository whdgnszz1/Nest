import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannel() {}

  @Get('name')
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats(@Query('perPage') perPage, @Query('page') page, @Param() param) {
    console.log(perPage, page);
    console.log(param);
    return 'getChat';
  }

  @Post(':name/chats')
  postChat(@Body() body) {
    return 'postChat';
  }

  @Get(':name/members')
  getAllMembers(@Body() body) {
    return 'postChat';
  }

  @Post(':name/members')
  inviteMembers(@Body() body) {
    return 'postChat';
  }
}
