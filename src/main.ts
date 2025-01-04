import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { validationPipeOptions } from './configs/validation';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
        const config = new DocumentBuilder()
            .setTitle('Cart Khane')
            .setDescription('The Cart Khane API description')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const documentFactory = () =>
            SwaggerModule.createDocument(app, config, {
                autoTagControllers: true,
            });

        SwaggerModule.setup('swagger', app, documentFactory);
    }

    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    app.enableCors({ origin: '*' });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
