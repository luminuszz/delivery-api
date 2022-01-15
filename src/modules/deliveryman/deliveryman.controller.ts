import { DeliveryMan } from '@core/entities/deliveryman.entity';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Controller, Get } from '@nestjs/common';

@Controller('deliveryman')
export class DeliverymanController {
    constructor(private readonly deliverymanService: DeliveryManService) {}

    @Get()
    async getAllDeliveryman(): Promise<DeliveryMan[]> {
        return this.deliverymanService.getAll();
    }
}
