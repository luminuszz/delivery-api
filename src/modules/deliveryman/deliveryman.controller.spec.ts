import { DeliveryModule } from '@app/modules/delivery/delivery.module';
import { DeliverymanController } from '@app/modules/deliveryman/deliveryman.controller';
import { parseDeliveryman } from '@app/modules/deliveryman/parses/parse-deliveryman.parser';
import { CreateDeliverymanValidationPipe } from '@app/modules/deliveryman/pipes/create-deliveryman.pipe';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { DeliveryService } from '@core/services/delivery.service';
import { ArgumentMetadata, BadRequestException, forwardRef, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DeliverymanServiceProvider } from './deliveryService.provider';

describe('app -> DeliverymanController', () => {
    let deliverymanController: DeliverymanController;
    let deliveryService: DeliveryService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                PersistenceModule.forFeature(DeliverymanRepository),
                HashModule,
                forwardRef(() => DeliveryModule),
            ],
            controllers: [DeliverymanController],
            providers: [DeliverymanServiceProvider],
        }).compile();

        deliverymanController = module.get<DeliverymanController>(DeliverymanController);
        deliveryService = module.get<DeliveryService>(DeliveryService);
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

    describe('getAllDeliverymanDeliveries', () => {
        it('should be abble to get all deliveryman deliveries', async () => {
            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanController.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const delivery1 = await deliveryService.createDelivery({
                client_id,
                item_name: faker.commerce.productName(),
            });

            const delivery2 = await deliveryService.createDelivery({
                client_id,
                item_name: faker.commerce.productName(),
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery1.id,
                deliveryman_id: deliveryman.id,
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery2.id,
                deliveryman_id: deliveryman.id,
            });

            const results = await deliverymanController.getAllDeliverymanDeliveries(deliveryman.id);

            expect(results).toHaveLength(2);

            results.forEach((item) => {
                expect(item.deliveryman_id).toEqual(deliveryman.id);
            });
        });
    });
});
