import { Role } from '@app/modules/auth/decorators/role.decorator';
import { User } from '@app/modules/auth/decorators/user.decorator';
import { AcceptDeliveryValidatorPipe } from '@app/modules/delivery/pipes/accpet-delivery-validator.pipe';
import { CreateDeliveryValidatorPipe } from '@app/modules/delivery/pipes/create-delivery-validator.pipe';
import { FinishDeliveryValidatorPipe } from '@app/modules/delivery/pipes/finish-delivery-validator.pipe';
import { DeliveryService } from '@core/services/delivery.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @ApiOperation({ description: 'Create delivery for client' })
    @Post()
    @ApiBearerAuth('Clients')
    @Role('client')
    async createDelivery(@User('id') client_id: string, @Body() data: CreateDeliveryValidatorPipe) {
        return this.deliveryService.createDelivery({
            client_id,
            item_name: data.item_name,
        });
    }

    @ApiBearerAuth('Deliveryman')
    @Role('deliveryman')
    @Put('accept')
    async acceptDelivery(@Body() data: AcceptDeliveryValidatorPipe, @User('id') deliveryman_id: string) {
        return this.deliveryService.acceptDelivery({
            delivery_id: data.delivery_id,
            deliveryman_id,
        });
    }

    @ApiBearerAuth('Deliveryman')
    @Role('deliveryman')
    @Put('finish')
    async finishDelivery(@User('id') deliveryman_id: string, @Body() data: FinishDeliveryValidatorPipe) {
        return this.deliveryService.finishDelivery({
            deliveryman_id,
            delivery_id: data.delivery_id,
            isDelivered: data.isDelivered,
        });
    }

    @Role('deliveryman')
    @ApiBearerAuth('Deliveryman')
    @Get('available')
    async getAllavailableDeliveries() {
        return this.deliveryService.findAllDeliveryWithStatusPending();
    }
}
