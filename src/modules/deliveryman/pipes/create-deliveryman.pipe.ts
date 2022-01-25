import { CreateDeliverymanDto } from '@core/dto/create-deliveryman.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliverymanValidationPipe implements CreateDeliverymanDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
}
