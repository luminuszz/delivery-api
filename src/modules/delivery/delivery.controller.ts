import { WithJwt } from '@app/modules/auth/decorators/withJwt.decorator';
import { CreateDeliveryValidatorPipe } from '@app/modules/delivery/pipes/create-delivery-validator.pipe';
import { DeliveryService } from '@core/services/delivery.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @WithJwt()
    @Post()
    async createDelivery(@Body() data: CreateDeliveryValidatorPipe) {
        return this.deliveryService.createDelivery(data);
    }
}
