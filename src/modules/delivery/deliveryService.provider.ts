import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliveryService } from '@core/services/delivery.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Provider } from '@nestjs/common';

export const DeliveryServiceProvider: Provider = {
    provide: DeliveryService,
    useFactory: (deliveryRepository: DeliveryRepository, deliveryManService: DeliveryManService) =>
        new DeliveryService(deliveryRepository, deliveryManService),
    inject: [DeliveryRepository, DeliveryManService],
};
