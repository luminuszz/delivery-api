import { ClientController } from '@app/modules/client/client.controller';
import { ClientServiceProvider } from '@app/modules/client/clientService.provider';
import { parserClient } from '@app/modules/client/parses/parserClient';
import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { Client } from '@core/entities/client.entity';
import { ClientRepository } from '@core/ports/client.repository';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('app -> ClientController', () => {
    let clientController: ClientController;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature(ClientRepository), HashModule],
            providers: [ClientServiceProvider],
            controllers: [ClientController],
        }).compile();

        clientController = module.get<ClientController>(ClientController);
    });

    describe('createClient', () => {
        it('should be able to create a new client', async () => {
            const client = await clientController.createClient({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            expect(client).toHaveProperty('id');
        });

        it('not should be able to create client with invalid data', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateClientValidatorPipe();

            dto.username = '';
            dto.password = '';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateClientValidatorPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });

    describe('getAllClients', () => {
        it('it should be able to return a list of clients endpoint', async () => {
            const getClient = () => ({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            await clientController.createClient(getClient());
            await clientController.createClient(getClient());

            const response = await clientController.getAllClients();

            expect(response.length).toBeGreaterThanOrEqual(1);
        });

        it('it should be able to parse a list of clients endpoints', async () => {
            const getClient = (): Client => ({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
                id: faker.random.uuid(),
                deliveries: [],
                updatedAt: faker.date.recent(),
                createdAt: faker.date.recent(),
            });

            const clients = [getClient(), getClient()];

            const parsedData = parserClient(clients);

            expect(parsedData[0]).not.toHaveProperty('password');
        });
    });
});
