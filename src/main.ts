import { AppModule } from '@app/app.module';
import { BadRequestExceptionInterceptor } from '@app/shared/interceptors/badRequestException.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

(async () => {
    const PORT = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new BadRequestExceptionInterceptor());

    await app.listen(PORT);
})();
