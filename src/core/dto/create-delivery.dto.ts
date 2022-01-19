import { Delivery } from '@core/entities/delivery.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateDeliveryDto extends OmitType(Delivery, [
    'createdAt',
    'updatedAt',
    'id',
    'client',
    'deliveryman',
    'status',
]) {}
