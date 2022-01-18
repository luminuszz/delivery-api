import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';

type WithOrPromise<T> = T | Promise<T>;

export abstract class DeliverymanRepository {
    abstract getAll(): WithOrPromise<Deliveryman[]>;
    abstract findOneById(id: string): WithOrPromise<Deliveryman>;
    abstract findOneByName(name: string): WithOrPromise<Deliveryman>;
    abstract create(data: CreateDeliverymanDto): WithOrPromise<Deliveryman>;
}
