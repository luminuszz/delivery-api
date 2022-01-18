import { CreateClientDto } from '@core/dto/create-client.dto';
import { Client } from '@core/entities/client.entity';

type WithOrPromise<T> = T | Promise<T>;

export abstract class ClientRepository {
    abstract getAll(): WithOrPromise<Client[]>;
    abstract findOneById(id: string): WithOrPromise<Client>;
    abstract findOneByName(name: string): WithOrPromise<Client>;
    abstract create(data: CreateClientDto): WithOrPromise<Client>;
}
