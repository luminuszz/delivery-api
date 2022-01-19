import { AcceptDeliveryDto } from '@core/dto/accepet-delivery.dto';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery } from '@core/entities/delivery.entity';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { DeliveryManService } from '@core/services/deliveryman.service';

export class DeliveryService {
    constructor(
        private readonly deliveryRepository: DeliveryRepository,
        private readonly deliveryManService: DeliveryManService,
    ) {}

    async createDelivery(data: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryRepository.createDelivery(data);
    }

    async acceptDelivery(data: AcceptDeliveryDto): Promise<Delivery> {
        const isDeliverymanExists = await this.deliveryManService.findUserDeliverymanById(data.deliveryman_id);

        if (!isDeliverymanExists) throw new BadPayloadException('deliveryman not found');

        return this.deliveryRepository.acceptDelivery(data);
    }
}
