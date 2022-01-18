import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export class BadRequestExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof BadPayloadException) {
                    throw new BadRequestException(error.message);
                }

                throw error;
            }),
        );
    }
}
