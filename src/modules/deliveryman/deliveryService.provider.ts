import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Provider } from '@nestjs/common';

export const DeliveryServiceProvider: Provider = {
    provide: DeliveryManService,
    useFactory: (deliverymanRepository: DeliverymanRepository) => new DeliveryManService(deliverymanRepository),
    inject: [DeliverymanRepository],
};
