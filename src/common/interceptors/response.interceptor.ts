import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const message =
                    typeof data === 'object' && data.message
                        ? data.message
                        : 'success';
                return {
                    message,
                    data:
                        typeof data === 'object' && data.message
                            ? data.data
                            : data,
                };
            }),
        );
    }
}
