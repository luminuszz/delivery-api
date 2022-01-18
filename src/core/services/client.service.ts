import { CreateClientDto } from '@core/dto/create-client.dto';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { ClientRepository } from '@core/ports/client.repository';
import { HashProvider } from '@core/ports/hash.provider';

export class ClientService {
    constructor(private readonly clientRepository: ClientRepository, private readonly hashProvider: HashProvider) {}

    async createClient({ username, password }: CreateClientDto) {
        const isUserExists = await this.clientRepository.findOneByName(username);

        if (isUserExists) throw new BadPayloadException('user already exists');

        const passwordHash = await this.hashProvider.hash(password);

        return this.clientRepository.create({
            username,
            password: passwordHash,
        });
    }

    async getAllClients() {
        return this.clientRepository.getAll();
    }

    async findClientByName(name: string) {
        return this.clientRepository.findOneByName(name);
    }
}
