import { AcceptDeliveryDto } from '@core/dto/accepet-delivery.dto';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery } from '@core/entities/delivery.entity';

type WithOrPromise<T> = T | Promise<T>;

export abstract class DeliveryRepository {
    abstract createDelivery(data: CreateDeliveryDto): WithOrPromise<Delivery>;

    abstract acceptDelivery(data: AcceptDeliveryDto): WithOrPromise<Delivery>;
}
