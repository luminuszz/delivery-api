import { HashServiceProvider } from '@app/providers/hash/hashService.provider';
import { Module } from '@nestjs/common';

@Module({
    providers: [HashServiceProvider],
    exports: [HashServiceProvider],
})
export class HashModule {}
