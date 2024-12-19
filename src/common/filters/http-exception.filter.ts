import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR_MESSAGE } from 'src/constants/errors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let errorResponse = {
            message: INTERNAL_SERVER_ERROR_MESSAGE,
            data: null,
        };

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                errorResponse.message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object') {
                errorResponse = {
                    message: exceptionResponse['message'] || 'Error',
                    data: exceptionResponse['data'] || null,
                };
            }
        }

        console.error(exception);

        response.status(status).json({
            ...errorResponse,
            statusCode: status,
        });
    }
}
