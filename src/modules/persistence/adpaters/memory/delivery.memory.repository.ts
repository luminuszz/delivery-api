import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery, DeliveryStatus } from '@core/entities/delivery.entity';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { uuid } from 'uuidv4';

export class DeliveryMemoryRepository implements DeliveryRepository {
    private deliveries: Delivery[] = [];

    createDelivery(data: CreateDeliveryDto): Delivery {
        const payload: Delivery = {
            ...data,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: DeliveryStatus.pending,
        };

        this.deliveries.push(payload);

        return payload;
    }
}
