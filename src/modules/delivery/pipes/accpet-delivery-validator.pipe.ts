import { AcceptDeliveryDto } from '@core/dto/accepet-delivery.dto';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AcceptDeliveryValidatorPipe extends OmitType(AcceptDeliveryDto, ['deliveryman_id']) {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    delivery_id: string;
}
