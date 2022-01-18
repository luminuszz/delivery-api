import { DeliveryRepository } from '@core/ports/delivery.repository';

export class DeliveryService {
    constructor(private readonly deliveryRepository: DeliveryRepository) {}
}
