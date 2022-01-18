import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { uuid } from 'uuidv4';

export class DeliverymanMemoryRepository implements DeliverymanRepository {
    create(data: CreateDeliverymanDto): Deliveryman {
        const payload: Deliveryman = {
            ...data,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveries: [],
        };

        this.deliverymans.push(payload);

        return payload;
    }
    findOneByName(name: string): Deliveryman {
        return this.deliverymans.find((item) => item.username === name);
    }
    findOneById(user_id: string): Deliveryman {
        return this.deliverymans.find((item) => item.id === user_id);
    }
    getAll(): Deliveryman[] {
        return this.deliverymans;
    }
    private deliverymans: Deliveryman[] = [];
}
