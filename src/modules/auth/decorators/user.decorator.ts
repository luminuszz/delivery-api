import { PayloadToken } from '@core/services/auth.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: keyof PayloadToken, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as { user: PayloadToken };

    return data ? req.user[data] : req.user;
});
