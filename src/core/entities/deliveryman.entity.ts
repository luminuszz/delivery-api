import { Delivery } from '@core/entities/delivery.entity';

export class Deliveryman {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    deliveries?: Delivery[];
}
