import { BcryptHashService } from '@app/providers/hash/adapters/bcrypt.service';
import { HashProvider } from '@core/ports/hash.provider';
import { Provider } from '@nestjs/common';

export const HashServiceProvider: Provider = {
    provide: HashProvider,
    useClass: BcryptHashService,
};
