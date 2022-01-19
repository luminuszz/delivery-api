import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { DeliveryStatus } from '@core/entities/delivery.entity';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliveryService } from '@core/services/delivery.service';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('core -> DeliveryService', () => {
    let deliveryService: DeliveryService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature([DeliveryRepository])],
            providers: [DeliveryServiceProvider],
        }).compile();

        deliveryService = moduleRef.get<DeliveryService>(DeliveryService);
    });

    describe('createDelivery', () => {
        it('should be able to create a new delivery', async () => {
            const client_id = faker.random.uuid();
            const deliveryman_id = faker.random.uuid();

            const newDelivery: CreateDeliveryDto = {
                item_name: faker.commerce.productName(),
                deliveryman_id,
                client_id,
            };

            const delivery = await deliveryService.createDelivery(newDelivery);

            expect(delivery).toHaveProperty('id');
            expect(delivery.client_id).toEqual(client_id);
            expect(delivery.deliveryman_id).toEqual(deliveryman_id);
            expect(delivery.status).toEqual(DeliveryStatus.pending);
        });
    });
});
