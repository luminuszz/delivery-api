import { DeliveryMan } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';

export class DeliverymanMemoryRepository implements DeliverymanRepository {
    getAll(): DeliveryMan[] {
        return this.deliverymans;
    }
    private deliverymans: DeliveryMan[] = [];
}
