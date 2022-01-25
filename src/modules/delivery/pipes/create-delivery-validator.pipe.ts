import { CreateDeliveryDto } from '@core/dto/create-delivery.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryValidatorPipe implements Omit<CreateDeliveryDto, 'client_id'> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    item_name: string;
}
