import { DeliverymanRepository } from '@core/ports/deliveryman.repository';

export class DeliveryManService {
    constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

    async getAll() {
        return this.deliverymanRepository.getAll();
    }
}
