import { PayloadToken } from '@core/services/auth.service';
import { createParamDecorator, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export const WithJwt = () => UseGuards(JwtAuthGuard);

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as { user: PayloadToken };

    console.log({
        user: req.user,
    });

    return req.user;
});
