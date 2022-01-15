import { DeliveryMan } from '@core/entities/deliveryman.entity';

type WithOrPromise<T> = T | Promise<T>;

export abstract class DeliverymanRepository {
    abstract getAll(): WithOrPromise<DeliveryMan[]>;
}
