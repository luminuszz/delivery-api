import { HashProvider } from '@core/ports/hash.provider';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashService implements HashProvider {
    private provider = bcrypt;

    async compare(value: string, hash: string): Promise<boolean> {
        return await this.provider.compare(value, hash);
    }

    async hash(value: string): Promise<string> {
        return this.provider.hash(value, 5);
    }
}
