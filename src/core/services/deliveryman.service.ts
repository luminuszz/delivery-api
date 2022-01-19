import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { HashProvider } from '@core/ports/hash.provider';

export class DeliveryManService {
    constructor(
        private readonly deliverymanRepository: DeliverymanRepository,
        private readonly hashProvider: HashProvider,
    ) {}

    async getAll() {
        return this.deliverymanRepository.getAll();
    }

    async findUserDeliverymanById(user_id: string): Promise<Deliveryman> {
        return this.deliverymanRepository.findOneById(user_id);
    }

    async findDeliverymanByName(name: string): Promise<Deliveryman> {
        return this.deliverymanRepository.findOneByName(name);
    }

    async createDeliveryman({ password, username }: CreateDeliverymanDto) {
        const existsDeliverymanWithThisName = await this.deliverymanRepository.findOneByName(username);

        if (existsDeliverymanWithThisName) throw new BadPayloadException('Already exists deliveryman with same name');

        const passwordHash = await this.hashProvider.hash(password);

        return this.deliverymanRepository.create({
            password: passwordHash,
            username,
        });
    }
}
