import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { DeliveryMan } from '@core/entities/deliveryman.entity';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliverymanPrismaRepository implements DeliverymanRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAll(): Promise<DeliveryMan[]> {
        return this.prisma.deliveryman.findMany();
    }
}
