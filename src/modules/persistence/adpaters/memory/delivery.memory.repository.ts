import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import {Delivery, DeliveryStatus} from '@core/entities/delivery.entity';
import {DeliveryRepository, UpdateDeliveryData} from '@core/ports/delivery.repository';
import {uuid} from 'uuidv4';

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

    updateDelivery(id: string, updateDeliveryData: UpdateDeliveryData): Delivery {
        const deliveryIndex = this.deliveries.findIndex((item) => item.id === id);

        const updatedDelivery = {
            ...this.deliveries[deliveryIndex],
            ...updateDeliveryData,
        };

        this.deliveries[deliveryIndex] = updatedDelivery;

        return updatedDelivery;
    }

    findDeliveryById(id: string): Delivery {
        return this.deliveries.find((item) => item.id === id);
    }

    findAllByClientId(client_id: string): Delivery[] {
        return this.deliveries.filter((item) => item.client_id === client_id);
    }

    findAllWithPendingStatus(): Delivery[] {
        return this.deliveries.filter((item) => item.status === DeliveryStatus.pending);
    }

    findAllByDeliverymanId(deliveryman_id: string): Delivery[] {
        return this.deliveries.filter((item) => item.deliveryman_id === deliveryman_id);
    }
}
