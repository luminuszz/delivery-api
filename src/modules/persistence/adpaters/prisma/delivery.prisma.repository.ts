import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { Delivery, DeliveryStatus } from '@core/entities/delivery.entity';
import { DeliveryRepository } from '@core/ports/delivery.repository';
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
}
