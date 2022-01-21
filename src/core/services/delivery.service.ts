import {AcceptDeliveryDto} from '@core/dto/accepet-delivery.dto';
import {CreateDeliveryDto} from '@core/dto/create-delivery.dto';
import {FinishDeliveryDto} from '@core/dto/finish-delivery.dto';
import {Delivery, DeliveryStatus} from '@core/entities/delivery.entity';
import {BadPayloadException} from '@core/errors/badPayloadException.error';
import {UnauthorizedException} from '@core/errors/unauthorizedException.error';
import {DeliveryRepository} from '@core/ports/delivery.repository';
import {DeliveryManService} from '@core/services/deliveryman.service';

export class DeliveryService {
    constructor(
        private readonly deliveryRepository: DeliveryRepository,
        private readonly deliveryManService: DeliveryManService,
    ) {
    }

    async getDeliveryById(id: string): Promise<Delivery> {
        return this.deliveryRepository.findDeliveryById(id);
    }

    async createDelivery(data: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryRepository.createDelivery(data);
    }

    async acceptDelivery(data: AcceptDeliveryDto): Promise<Delivery> {
        const isDeliverymanExists = await this.deliveryManService.findUserDeliverymanById(data.deliveryman_id);

        if (!isDeliverymanExists) throw new BadPayloadException('deliveryman not found');

        const delivery = await this.getDeliveryById(data.delivery_id);

        const isAvailableForDelivery =
            delivery.status === DeliveryStatus.pending || delivery.status === DeliveryStatus.notDelivered;

        if (!isAvailableForDelivery) {
            throw new UnauthorizedException('this item is not available for delivery');
        }

        return this.deliveryRepository.updateDelivery(data.delivery_id, {
            status: DeliveryStatus.transport,
            deliveryman_id: data.deliveryman_id,
        });
    }

    async finishDelivery({delivery_id, deliveryman_id, isDelivered}: FinishDeliveryDto): Promise<Delivery> {
        const delivery = await this.getDeliveryById(delivery_id);

        if (delivery.status !== DeliveryStatus.transport) {
            throw new UnauthorizedException('Delivery is not available');
        }

        const isSameDeliveryman = delivery.deliveryman_id === deliveryman_id;

        if (!isSameDeliveryman) {
            throw new UnauthorizedException('its not possible to finish delivery');
        }

        return this.deliveryRepository.updateDelivery(delivery_id, {
            deliveryman_id,
            status: isDelivered ? DeliveryStatus.delivered : DeliveryStatus.notDelivered,
            end_at: new Date(),
        });
    }

    async findAllClientDeliveries(client_id: string): Promise<Delivery[]> {
        return this.deliveryRepository.findAllByClientId(client_id);
    }

    async findAllDeliveryWithStatusPending(): Promise<Delivery[]> {
        return this.deliveryRepository.findAllWithPendingStatus();
    }

    async findAllDeliverymanDeliveries(deliveryman_id: string) {
        return this.deliveryRepository.findAllByDeliverymanId(deliveryman_id);
    }
}
