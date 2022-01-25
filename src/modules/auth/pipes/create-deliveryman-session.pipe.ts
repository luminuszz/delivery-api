import { ValidateDeliverymanDto } from '@core/dto/validate-deliveryman.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliverymanSessionPipe implements ValidateDeliverymanDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
}
