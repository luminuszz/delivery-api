import { AppModule } from '@app/app.module';
import { CustomExceptionInterceptor } from '@app/shared/interceptors/customException.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

(async () => {
    const PORT = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new CustomExceptionInterceptor());
    await app.listen(PORT);
})();
