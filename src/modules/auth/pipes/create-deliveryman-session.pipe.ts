import { ValidateDeliverymanDto } from '@core/dto/validate-deliveryman.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliverymanSessionPipe implements ValidateDeliverymanDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
