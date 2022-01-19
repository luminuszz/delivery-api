import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { AcceptDeliveryValidatorPipe } from '@app/modules/delivery/pipes/accpet-delivery-validator.pipe';
import { CreateDeliveryValidatorPipe } from '@app/modules/delivery/pipes/create-delivery-validator.pipe';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliveryStatus } from '@core/entities/delivery.entity';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DeliveryController } from './delivery.controller';

describe('app  -> DeliveryController', () => {
    let deliveryController: DeliveryController;
    let deliverymanService: DeliveryManService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature([DeliveryRepository]), DeliverymanModule],
            controllers: [DeliveryController],
            providers: [DeliveryServiceProvider],
        }).compile();

        deliveryController = moduleRef.get<DeliveryController>(DeliveryController);
        deliverymanService = moduleRef.get<DeliveryManService>(DeliveryManService);
    });

    describe('createDelivery', () => {
        it('should be able to create a new delivery by endpoint', async () => {
            const delivery: CreateDeliveryValidatorPipe = {
                client_id: faker.datatype.uuid(),
                item_name: faker.commerce.productName(),
            };

            const response = await deliveryController.createDelivery(delivery);

            expect(response).toHaveProperty('id');
        });

        it('should be able to validate a create delivery body by pipe -> CreateDeliveryValidatorPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateDeliveryValidatorPipe();

            dto.item_name = '';
            dto.client_id = 'NOT_A_UUID';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateDeliveryValidatorPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });

    describe('acceptDelivery', () => {
        it('should be able to accpet delivery endpoint', async () => {
            const delivery_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const results = await deliveryController.acceptDelivery({ delivery_id }, deliveryman.id);

            expect(results.deliveryman_id).toEqual(deliveryman.id);
            expect(results.status).toEqual(DeliveryStatus.transport);
        });

        it('should be able to validate a accept delivery body by pipe -> AcceptDeliveryValidatorPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new AcceptDeliveryValidatorPipe();

            dto.delivery_id = 'NOT_A_UUID';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: AcceptDeliveryValidatorPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
