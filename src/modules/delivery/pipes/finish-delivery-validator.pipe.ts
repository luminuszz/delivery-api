import { FinishDeliveryDto } from '@core/dto/finish-delivery.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class FinishDeliveryValidatorPipe implements Omit<FinishDeliveryDto, 'deliveryman_id'> {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    delivery_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDelivered: boolean;
}
