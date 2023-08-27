import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator((unknown, ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse();
  return response.locals.jwt;
});
