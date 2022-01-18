import { Client } from '@core/entities/client.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateClientDto extends OmitType(Client, ['createdAt', 'updatedAt', 'id', 'deliveries'] as const) {}
