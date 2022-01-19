import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { CreateDeliveryValidatorPipe } from '@app/modules/delivery/pipes/create-delivery-validator.pipe';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DeliveryController } from './delivery.controller';

describe('app  -> DeliveryController', () => {
    let deliveryController: DeliveryController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature([DeliveryRepository])],
            controllers: [DeliveryController],
            providers: [DeliveryServiceProvider],
        }).compile();

        deliveryController = moduleRef.get<DeliveryController>(DeliveryController);
    });

    describe('createDelivery', () => {
        it('should be able to create a new delivery by endpoint', async () => {
            const delivery: CreateDeliveryValidatorPipe = {
                deliveryman_id: faker.random.uuid(),
                client_id: faker.random.uuid(),
                item_name: faker.commerce.productName(),
            };

            const response = await deliveryController.createDelivery(delivery);

            expect(response).toHaveProperty('id');
        });

        it('should be able to validate a create delivery body by pipe -> CreateDeliveryValidatorPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateDeliveryValidatorPipe();

            dto.item_name = '';
            dto.deliveryman_id = 'NOT_A_UUID';
            dto.client_id = 'NOT_A_UUID';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateDeliveryValidatorPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
