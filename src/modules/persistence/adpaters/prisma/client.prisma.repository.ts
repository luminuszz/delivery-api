import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { CreateClientDto } from '@core/dto/create-client.dto';
import { Client } from '@core/entities/client.entity';
import { ClientRepository } from '@core/ports/client.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateClientDto): Promise<Client> {
        return this.prisma.client.create({
            data,
        });
    }

    findOneById(id: string): Promise<Client> {
        return this.prisma.client.findUnique({
            where: {
                id,
            },
        });
    }

    findOneByName(name: string): Promise<Client> {
        return this.prisma.client.findUnique({
            where: {
                username: name,
            },
        });
    }

    getAll(): Promise<Client[]> {
        return this.prisma.client.findMany();
    }
}
