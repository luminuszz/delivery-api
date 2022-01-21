import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryValidatorPipe implements Omit<CreateDeliveryDto, 'client_id'> {
    @IsString()
    @IsNotEmpty()
    item_name: string;
}
