import { Deliveryman } from '@core/entities/deliveryman.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateDeliverymanDto extends OmitType(Deliveryman, [
    'createdAt',
    'updatedAt',
    'id',
    'deliveries',
] as const) {}
