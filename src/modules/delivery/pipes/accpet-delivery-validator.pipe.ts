import { AcceptDeliveryDto } from '@core/dto/accepet-delivery.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AcceptDeliveryValidatorPipe extends OmitType(AcceptDeliveryDto, ['deliveryman_id']) {
    @IsNotEmpty()
    @IsUUID()
    delivery_id: string;
}
