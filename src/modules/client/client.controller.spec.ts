import { ClientController } from '@app/modules/client/client.controller';
import { ClientServiceProvider } from '@app/modules/client/clientService.provider';
import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/providers/hash/hash.module';
import { ClientRepository } from '@core/ports/client.repository';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('clientController', () => {
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
});
