import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery } from '@core/entities/delivery.entity';

type WithOrPromise<T> = T | Promise<T>;

export type UpdateDeliveryData = Partial<Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>>;

export abstract class DeliveryRepository {
    abstract createDelivery(data: CreateDeliveryDto): WithOrPromise<Delivery>;

    abstract updateDelivery(id: string, data: UpdateDeliveryData): WithOrPromise<Delivery>;

    abstract findDeliveryById(id: string): WithOrPromise<Delivery>;

    abstract findAllByClientId(client_id: string): WithOrPromise<Delivery[]>;

    abstract findAllWithPendingStatus(): WithOrPromise<Delivery[]>;

    abstract findAllByDeliverymanId(deliveryman_id: string): WithOrPromise<Delivery[]>;
}
