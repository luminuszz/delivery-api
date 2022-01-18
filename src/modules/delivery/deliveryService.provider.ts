import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliveryService } from '@core/services/delivery.service';
import { Provider } from '@nestjs/common';

export const DeliveryServiceProvider: Provider = {
    provide: DeliveryService,
    useFactory: (deliveryRepository: DeliveryRepository) => new DeliveryService(deliveryRepository),
    inject: [DeliveryRepository],
};
