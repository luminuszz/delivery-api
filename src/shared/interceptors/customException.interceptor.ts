import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { UnauthorizedException } from '@core/errors/unauthorizedException.error';
import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UnauthorizedException as NestUnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export class CustomExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof BadPayloadException) {
                    throw new BadRequestException(error.message);
                }

                if (error instanceof UnauthorizedException) {
                    throw new NestUnauthorizedException(error.message);
                }

                throw error;
            }),
        );
    }
}
