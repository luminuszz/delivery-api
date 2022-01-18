import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliverymanPrismaRepository implements DeliverymanRepository {
    async create(data: CreateDeliverymanDto): Promise<Deliveryman> {
        return this.prisma.deliveryman.create({
            data,
        });
    }
    async findOneByName(name: string): Promise<Deliveryman> {
        return this.prisma.deliveryman.findUnique({
            where: {
                username: name,
            },
        });
    }
    constructor(private readonly prisma: PrismaService) {}

    async findOneById(id: string): Promise<Deliveryman> {
        return this.prisma.deliveryman.findUnique({
            where: {
                id,
            },
        });
    }

    async getAll(): Promise<Deliveryman[]> {
        return this.prisma.deliveryman.findMany();
    }
}
