import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

export const PARSER_METADATA_KEY = 'PARSER_METADATA_KEY';

export type Parser<T = any> = (value: any) => T;

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const parserFunc: Parser | undefined =
            this.reflector.get(PARSER_METADATA_KEY, context.getHandler()) ||
            this.reflector.get(PARSER_METADATA_KEY, context.getClass());

        return next.handle().pipe(
            map((data) => {
                return parserFunc ? parserFunc(data) : data;
            }),
        );
    }
}
