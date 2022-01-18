import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { DeliverymanController } from '@app/modules/deliveryman/deliveryman.controller';
import { parseDeliveryman } from '@app/modules/deliveryman/parses/parse-deliveryman.parser';
import { CreateDeliverymanValidationPipe } from '@app/modules/deliveryman/pipes/create-deliveryman.pipe';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DeliverymanServiceProvider } from './deliveryService.provider';

describe('app -> DeliverymanController', () => {
    let deliverymanController: DeliverymanController;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature(DeliverymanRepository), HashModule],
            controllers: [DeliverymanController],
            providers: [DeliverymanServiceProvider],
        }).compile();

        deliverymanController = module.get<DeliverymanController>(DeliverymanController);
    });

    describe('getAllDeliveryman', () => {
        it('it should be able to get deliveryman endpoint list', async () => {
            const response = await deliverymanController.getAllDeliveryman();

            expect(Array.isArray(response)).toBeTruthy();
        });
    });

    describe('createDeliveryman', () => {
        it('it should be able to create a new deliveryman endpoint', async () => {
            const response = await deliverymanController.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            expect(response).toHaveProperty('id');
        });

        it('it should be able to parser create deliveryman endpoint response', () => {
            const deliveryman: Deliveryman = {
                password: faker.random.alpha(),
                deliveries: [],
                id: faker.random.uuid(),
                username: faker.name.firstName(),
                updatedAt: faker.date.recent(),
                createdAt: faker.date.recent(),
            };

            const parsedData = parseDeliveryman(deliveryman);

            expect(parsedData).not.toHaveProperty('password');
            expect(parsedData).toHaveProperty('id');
        });

        it('it should be able to validate data -> CreateDeliverymanValidationPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateDeliverymanValidationPipe();

            dto.username = '';
            dto.password = '';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateDeliverymanValidationPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
