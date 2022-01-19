import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDeliveryValidatorPipe implements CreateDeliveryDto {
    @IsString()
    @IsNotEmpty()
    item_name: string;

    @IsUUID()
    client_id: string;
}
