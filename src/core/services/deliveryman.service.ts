import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';

export class DeliveryManService {
    constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

    async getAll() {
        return this.deliverymanRepository.getAll();
    }

    async findUserDeliverymanById(user_id: string): Promise<Deliveryman> {
        const deliveryman = await this.deliverymanRepository.findOneById(user_id);

        if (!deliveryman) throw new BadPayloadException('deliveryman not found');

        return deliveryman;
    }

    async findDeliverymanByName(name: string): Promise<Deliveryman> {
        const deliveryman = await this.deliverymanRepository.findOneByName(name);

        if (!deliveryman) throw new BadPayloadException('deliveryman not found');

        return deliveryman;
    }

    async createDeliveryman({ password, username }: CreateDeliverymanDto) {
        const existsDeliverymanWithThisName = await this.deliverymanRepository.findOneByName(username);

        if (existsDeliverymanWithThisName) throw new Error('Already exists deliveryman with same name');

        return this.deliverymanRepository.create({
            password,
            username,
        });
    }
}
