import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const USER_KEY_IN_REQUEST = 'user';

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request[USER_KEY_IN_REQUEST];
    },
);
