import { ClientRepository } from '@core/ports/client.repository';
import { HashProvider } from '@core/ports/hash.provider';
import { ClientService } from '@core/services/client.service';
import { Provider } from '@nestjs/common';

export const ClientServiceProvider: Provider = {
    provide: ClientService,
    useFactory: (clientRepository: ClientRepository, hashProvider: HashProvider) =>
        new ClientService(clientRepository, hashProvider),
    inject: [ClientRepository, HashProvider],
};
