import { AppModule } from '@app/app.module';
import { CustomExceptionInterceptor } from '@app/shared/interceptors/customException.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
    const PORT = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new CustomExceptionInterceptor());

    const config = new DocumentBuilder()
        .setTitle('Delivery - api')
        .addTag('Delivery')
        .addTag('Deliveryman')
        .addTag('Clients')
        .addTag('Auth')
        .addBearerAuth({ type: 'http', description: 'Client token' }, 'Clients')
        .addBearerAuth({ type: 'http', description: 'Deliveryman token' }, 'Deliveryman')
        .setDescription('Api for manager deliveries')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, { swaggerOptions: { persistAuthorization: true } });

    await app.listen(PORT);
})();
