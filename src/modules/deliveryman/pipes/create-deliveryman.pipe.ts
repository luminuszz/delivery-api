import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliverymanValidationPipe implements CreateDeliverymanDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
