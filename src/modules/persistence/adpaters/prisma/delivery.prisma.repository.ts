import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery, DeliveryStatus } from '@core/entities/delivery.entity';
import { DeliveryRepository, UpdateDeliveryData } from '@core/ports/delivery.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryPrismaRepository implements DeliveryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createDelivery(data: CreateDeliveryDto): Promise<Delivery> {
        return await this.prisma.delivery.create({
            data: {
                ...data,
                status: DeliveryStatus.pending,
            },
        });
    }

    async updateDelivery(id: string, updateDeliveryData: UpdateDeliveryData): Promise<Delivery> {
        return this.prisma.delivery.update({
            where: {
                id,
            },
            data: {
                ...(updateDeliveryData as any),
            },
        });
    }

    async findDeliveryById(id: string): Promise<Delivery> {
        return this.prisma.delivery.findUnique({
            where: {
                id,
            },
        });
    }

    async findAllByClientId(client_id: string): Promise<Delivery[]> {
        return this.prisma.delivery.findMany({
            where: {
                client_id,
            },
        });
    }

    async findAllWithPendingStatus(): Promise<Delivery[]> {
        return this.prisma.delivery.findMany({
            where: {
                status: DeliveryStatus.pending,
            },
        });
    }

    findAllByDeliverymanId(deliveryman_id: string): Promise<Delivery[]> {
        return this.prisma.delivery.findMany({
            where: {
                deliveryman_id,
            },
        });
    }
}
