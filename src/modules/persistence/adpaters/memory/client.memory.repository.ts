import { CreateClientDto } from '@core/dto/create-client.dto';
import { Client } from '@core/entities/client.entity';
import { ClientRepository } from '@core/ports/client.repository';
import { uuid } from 'uuidv4';

export class ClientMemoryRepository implements ClientRepository {
    private clients: Client[] = [];

    create(data: CreateClientDto): Client {
        const payload: Client = {
            password: data.password,
            username: data.username,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveries: [],
        };

        this.clients.push(payload);

        return payload;
    }

    findOneById(id: string): Client {
        return undefined;
    }

    findOneByName(name: string): Client {
        return this.clients.find((item) => item.username === name);
    }

    getAll(): Client[] {
        return undefined;
    }
}
