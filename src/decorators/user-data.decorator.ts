import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserData } from '../interfaces';

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserData => {
    const request = ctx.switchToHttp().getRequest();

    return request.userData;
  },
);
