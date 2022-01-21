import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { DeliveryStatus } from '@core/entities/delivery.entity';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { UnauthorizedException } from '@core/errors/unauthorizedException.error';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { DeliveryService } from '@core/services/delivery.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('core -> DeliveryService', () => {
    let deliveryService: DeliveryService;
    let deliverymanService: DeliveryManService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature([DeliveryRepository, DeliverymanRepository]), HashModule],
            providers: [DeliveryServiceProvider, DeliverymanServiceProvider],
        }).compile();

        deliveryService = moduleRef.get<DeliveryService>(DeliveryService);
        deliverymanService = moduleRef.get<DeliveryManService>(DeliveryManService);
    });

    describe('createDelivery', () => {
        it('should be able to create a new delivery', async () => {
            const client_id = faker.random.uuid();

            const newDelivery: CreateDeliveryDto = {
                item_name: faker.commerce.productName(),
                client_id,
            };

            const delivery = await deliveryService.createDelivery(newDelivery);

            expect(delivery).toHaveProperty('id');
            expect(delivery.client_id).toEqual(client_id);
            expect(delivery.status).toEqual(DeliveryStatus.pending);
        });
    });

    describe('acceptDelivery', () => {
        it('should ble able to deliveryman accept  delivery', async () => {
            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            const response = await deliveryService.acceptDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
            });

            expect(response.deliveryman_id).toEqual(deliveryman.id);
        });

        it('not should ble able to deliveryman accept if deliveryman not exists', async () => {
            const client_id = faker.datatype.uuid();
            const deliveryman_id = 'NOT_EXISTENT_ID';

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await expect(
                deliveryService.acceptDelivery({
                    delivery_id: delivery.id,
                    deliveryman_id,
                }),
            ).rejects.toBeInstanceOf(BadPayloadException);
        });

        it('not should ble able to deliveryman accept if delivery is  not available', async () => {
            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
            });

            await expect(
                deliveryService.acceptDelivery({
                    delivery_id: delivery.id,
                    deliveryman_id: deliveryman.id,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
    });

    describe('finishDelivery', () => {
        it('should be able to deliveryman finish delivery with status delivered', async () => {
            const mockedDate = new Date();

            jest.spyOn(global, 'Date').mockReturnValue(mockedDate as any);

            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                password: faker.random.alpha(),
                username: faker.name.firstName(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
            });

            const results = await deliveryService.finishDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
                isDelivered: true,
            });

            expect(results.status).toEqual(DeliveryStatus.delivered);
            expect(results.end_at).toBeTruthy();
            expect(results.end_at).toBe(mockedDate);
        });

        it('should be able to deliveryman finish delivery with status notDelivered', async () => {
            const mockedDate = new Date();

            jest.spyOn(global, 'Date').mockReturnValue(mockedDate as any);

            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                password: faker.random.alpha(),
                username: faker.name.firstName(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
            });

            const results = await deliveryService.finishDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
                isDelivered: false,
            });

            expect(results.status).toEqual(DeliveryStatus.notDelivered);
            expect(results.end_at).toBeTruthy();
            expect(results.end_at).toBe(mockedDate);
        });

        it('not should be able to finish delivery if delivery not accepted', async () => {
            const client_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                password: faker.random.alpha(),
                username: faker.name.firstName(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await expect(
                deliveryService.finishDelivery({
                    delivery_id: delivery.id,
                    deliveryman_id: deliveryman.id,
                    isDelivered: true,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });

        it('should not be able to finish the delivery if the deliveryman is different from the one who accepted the delivery', async () => {
            const client_id = faker.datatype.uuid();
            const otherDeliveryman_id = faker.datatype.uuid();

            const deliveryman = await deliverymanService.createDeliveryman({
                password: faker.random.alpha(),
                username: faker.name.firstName(),
            });

            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.acceptDelivery({
                delivery_id: delivery.id,
                deliveryman_id: deliveryman.id,
            });

            await expect(
                deliveryService.finishDelivery({
                    delivery_id: delivery.id,
                    deliveryman_id: otherDeliveryman_id,
                    isDelivered: true,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
    });

    describe('getDeliveryById', () => {
        it('should be able to find delivery by id', async () => {
            const delivery = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id: faker.datatype.uuid(),
            });

            const results = await deliveryService.getDeliveryById(delivery.id);

            expect(results.id).toEqual(delivery.id);
            expect(results.item_name).toEqual(delivery.item_name);
            expect(results.deliveryman_id).toBeFalsy();
        });
    });

    describe('findAllClientDeliveries', () => {
        it('should able to get all client deliveries', async () => {
            const client_id = faker.datatype.uuid();
            const OTHER_CLIENT_ID = faker.datatype.uuid();

            await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id: OTHER_CLIENT_ID,
            });

            const results = await deliveryService.findAllClientDeliveries(client_id);

            expect(results).toHaveLength(2);

            results.forEach((result) => {
                expect(result.client_id).toEqual(client_id);
            });
        });
    });

    describe('findAllDeliveryWithStatusPending', () => {
        it('should be able to find all deliveries with status "pending"', async () => {
            const client_id = faker.datatype.uuid();

            await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            const results = await deliveryService.findAllDeliveryWithStatusPending();

            expect(results.filter((item) => item.client_id === client_id)).toHaveLength(2);

            results.map((item) => {
                expect(item.status).toEqual(DeliveryStatus.pending);
            });
        });
    });

    describe('findAllDeliverymanDeliveries', () => {
        it('should be able to get all deliveryman deliveries', async () => {
            const client_id = faker.datatype.uuid();

            const { id: deliveryman_id } = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            });

            const { id: deliveryId1 } = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });
            const { id: deliveryId2 } = await deliveryService.createDelivery({
                item_name: faker.commerce.productName(),
                client_id,
            });

            await deliveryService.acceptDelivery({ delivery_id: deliveryId1, deliveryman_id });
            await deliveryService.acceptDelivery({ delivery_id: deliveryId2, deliveryman_id });

            const results = await deliveryService.findAllDeliverymanDeliveries(deliveryman_id);

            expect(results).toHaveLength(2);

            results.forEach((item) => {
                expect(item.status).toEqual(DeliveryStatus.transport);
                expect(item.deliveryman_id).toEqual(deliveryman_id);
            });
        });
    });
});
