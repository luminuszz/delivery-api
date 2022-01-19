import { PayloadToken } from '@core/services/auth.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as { user: PayloadToken };

    return req.user;
});
