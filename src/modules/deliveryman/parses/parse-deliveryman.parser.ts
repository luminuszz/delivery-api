import { Deliveryman } from '@core/entities/deliveryman.entity';

type Response = Omit<Deliveryman, 'password'>;

export function parseDeliveryman(deliveryman: Deliveryman): Response {
    delete deliveryman.password;

    return deliveryman;
}
