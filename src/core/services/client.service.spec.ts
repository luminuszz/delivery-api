import { ClientServiceProvider } from '@app/modules/client/clientService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/providers/hash/hash.module';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { ClientRepository } from '@core/ports/client.repository';
import { ClientService } from '@core/services/client.service';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('core -> clientService', () => {
    let clientService: ClientService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature(ClientRepository), HashModule],
            providers: [ClientServiceProvider],
        }).compile();

        clientService = module.get<ClientService>(ClientService);
    });

    it('should be able to create new client', async () => {
        const payload = {
            username: faker.name.firstName(),
            password: faker.random.word(),
        };

        const client = await clientService.createClient(payload);

        expect(client).toHaveProperty('id');
        expect(client).toHaveProperty('username');
        expect(payload.password).not.toBe(client.password);
    });

    it('not should be able to create new client if username already exists', async () => {
        const SAME_NAME = 'SAME_NAME';

        await clientService.createClient({
            username: SAME_NAME,
            password: faker.random.word(),
        });

        await expect(
            clientService.createClient({
                username: SAME_NAME,
                password: faker.random.word(),
            }),
        ).rejects.toBeInstanceOf(BadPayloadException);
    });
});
