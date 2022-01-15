import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async () => {
    const PORT = process.env.PORT;

    const app = await NestFactory.create(AppModule);
    await app.listen(PORT || 3000);
})();
