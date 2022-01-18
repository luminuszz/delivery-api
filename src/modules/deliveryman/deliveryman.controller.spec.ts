import { DeliverymanController } from '@app/modules/deliveryman/deliveryman.controller';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { Test } from '@nestjs/testing';

import { DeliverymanServiceProvider } from './deliveryService.provider';

describe('deliverymanController', () => {
    let deliverymanController: DeliverymanController;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature(DeliverymanRepository)],
            controllers: [DeliverymanController],
            providers: [DeliverymanServiceProvider],
        }).compile();

        deliverymanController = module.get<DeliverymanController>(DeliverymanController);
    });

    it('it should be able to get  deliveryman list', async () => {
        const response = await deliverymanController.getAllDeliveryman();

        expect(Array.isArray(response)).toBeTruthy();
    });
});
