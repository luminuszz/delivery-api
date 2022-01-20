import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export const IS_PUBLIC_METHOD_METADATA_KEY = 'IS_PUBLIC_METHOD_METADATA_KEY';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get(IS_PUBLIC_METHOD_METADATA_KEY, context.getHandler() || context.getClass());

        console.log({ isPublic });

        return !isPublic ? super.canActivate(context) : true;
    }
}
