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
            const client_id = faker.datatype.uuid();

            const delivery: CreateDeliveryValidatorPipe = {
                item_name: faker.commerce.productName(),
            };

            const response = await deliveryController.createDelivery(client_id, delivery);

            expect(response).toHaveProperty('id');
        });

        it('should be able to validate a create delivery body by pipe -> CreateDeliveryValidatorPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateDeliveryValidatorPipe();

            dto.item_name = '';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateDeliveryValidatorPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });

    describe('acceptDelivery', () => {
        it('should be able to accept delivery endpoint', async () => {
            const client_id = faker.datatype.uuid();

            const delivery = await deliveryController.createDelivery(client_id, {
                item_name: faker.commerce.productName(),
            });

            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const results = await deliveryController.acceptDelivery({ delivery_id: delivery.id }, deliveryman.id);

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

    describe('finishDelivery', () => {
        it('should be able to finish delivery endpoint', async () => {
            const mockedDate = new Date();

            jest.spyOn(global, 'Date').mockReturnValue(mockedDate as any);

            const client_id = faker.datatype.uuid();

            const delivery = await deliveryController.createDelivery(client_id, {
                item_name: faker.commerce.productName(),
            });

            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            await deliveryController.acceptDelivery({ delivery_id: delivery.id }, deliveryman.id);

            const results = await deliveryController.finishDelivery(deliveryman.id, {
                isDelivered: true,
                delivery_id: delivery.id,
            });

            expect(results.status).toEqual(DeliveryStatus.delivered);
            expect(results.end_at).toBeTruthy();
            expect(results.end_at).toBe(mockedDate);
        });
    });

    describe('getAllavailableDeliveries', () => {
        it('should be able to get all deliveries with status pending endpoint', async () => {
            const client_id = faker.datatype.uuid();
            const secondClient_id = faker.datatype.uuid();

            await deliveryController.createDelivery(client_id, {
                item_name: faker.commerce.productName(),
            });

            await deliveryController.createDelivery(secondClient_id, {
                item_name: faker.commerce.productName(),
            });

            const response = await deliveryController.getAllavailableDeliveries();

            const scoopedResponse = response.filter(
                (item) => item.client_id === client_id || item.client_id === secondClient_id,
            );

            expect(scoopedResponse).toHaveLength(2);

            scoopedResponse.forEach((item) => {
                expect(item.status).toEqual(DeliveryStatus.pending);
            });
        });
    });
});
