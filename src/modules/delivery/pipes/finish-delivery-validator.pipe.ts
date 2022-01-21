import { FinishDeliveryDto } from '@core/dto/finish-delivery.dto';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class FinishDeliveryValidatorPipe implements Omit<FinishDeliveryDto, 'deliveryman_id'> {
    @IsNotEmpty()
    @IsUUID()
    delivery_id: string;

    @IsNotEmpty()
    @IsBoolean()
    isDelivered: boolean;
}
