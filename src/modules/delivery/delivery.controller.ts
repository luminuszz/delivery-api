import { Role } from '@app/modules/auth/decorators/role.decorator';
import { User } from '@app/modules/auth/decorators/user.decorator';
import { WithJwt } from '@app/modules/auth/decorators/withJwt.decorator';
import { AcceptDeliveryValidatorPipe } from '@app/modules/delivery/pipes/accpet-delivery-validator.pipe';
import { CreateDeliveryValidatorPipe } from '@app/modules/delivery/pipes/create-delivery-validator.pipe';
import { DeliveryService } from '@core/services/delivery.service';
import { Body, Controller, Post, Put } from '@nestjs/common';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @WithJwt()
    @Post()
    @Role('client')
    async createDelivery(@Body() data: CreateDeliveryValidatorPipe) {
        return this.deliveryService.createDelivery(data);
    }

    @WithJwt()
    @Put('accept')
    @Role('deliveryman')
    async acceptDelivery(@Body() data: AcceptDeliveryValidatorPipe, @User('id') deliveryman_id: string) {
        return this.deliveryService.acceptDelivery({
            delivery_id: data.delivery_id,
            deliveryman_id,
        });
    }
}
