import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { AcceptDeliveryDto } from '@core/dto/accepet-delivery.dto';
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

    acceptDelivery({ delivery_id, deliveryman_id }: AcceptDeliveryDto): Promise<Delivery> {
        return this.prisma.delivery.update({
            where: {
                id: delivery_id,
            },
            data: {
                deliveryman_id,
                status: DeliveryStatus.transport,
            },
        });
    }

    async findDeliveryPending() {
        return this.prisma.delivery.findMany({
            where: {
                AND: [
                    {
                        deliveryman_id: null,
                    },
                    {
                        status: DeliveryStatus.pending,
                    },
                ],
            },
        });
    }
}
