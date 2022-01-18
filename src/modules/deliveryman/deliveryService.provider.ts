import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { HashProvider } from '@core/ports/hash.provider';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Provider } from '@nestjs/common';

export const DeliverymanServiceProvider: Provider = {
    provide: DeliveryManService,
    useFactory: (deliverymanRepository: DeliverymanRepository, hashProvider: HashProvider) =>
        new DeliveryManService(deliverymanRepository, hashProvider),
    inject: [DeliverymanRepository, HashProvider],
};
