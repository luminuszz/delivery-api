import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery } from '@core/entities/delivery.entity';
import { DeliveryRepository } from '@core/ports/delivery.repository';

export class DeliveryService {
    constructor(private readonly deliveryRepository: DeliveryRepository) {}

    async createDelivery(data: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryRepository.createDelivery(data);
    }
}
