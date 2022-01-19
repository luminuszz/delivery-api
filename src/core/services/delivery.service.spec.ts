import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { DeliveryStatus } from '@core/entities/delivery.entity';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
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
    });
});
