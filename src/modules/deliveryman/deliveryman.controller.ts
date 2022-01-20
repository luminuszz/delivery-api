import { Public } from '@app/modules/auth/decorators/public.decorator';
import { parseDeliveryman } from '@app/modules/deliveryman/parses/parse-deliveryman.parser';
import { CreateDeliverymanValidationPipe } from '@app/modules/deliveryman/pipes/create-deliveryman.pipe';
import { Parser } from '@app/shared/decorators/parser.decorator';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('deliveryman')
export class DeliverymanController {
    constructor(private readonly deliverymanService: DeliveryManService) {}

    @Get()
    async getAllDeliveryman(): Promise<Deliveryman[]> {
        return this.deliverymanService.getAll();
    }

    @Post()
    @Public()
    @Parser(parseDeliveryman)
    async createDeliveryman(@Body() data: CreateDeliverymanValidationPipe) {
        return this.deliverymanService.createDeliveryman(data);
    }
}
