import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { validationPipeOptions } from './configs/validation';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    app.enableCors({ origin: '*' });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
