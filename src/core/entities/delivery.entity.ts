import { Client } from '@core/entities/client.entity';
import { Deliveryman } from '@core/entities/deliveryman.entity';

export enum DeliveryStatus {
    pending = 'pending',
    delivered = 'delivered',
    notDelivered = 'notDelivered',
}

export class Delivery {
    id: string;

    item_name: string;
    client_id: string;
    deliveryman_id: string;
    status: DeliveryStatus;

    updatedAt: Date;
    createdAt: Date;

    client?: Client;
    deliveryman?: Deliveryman;
}
