import { Public } from '@app/modules/auth/decorators/public.decorator';
import { Role } from '@app/modules/auth/decorators/role.decorator';
import { User } from '@app/modules/auth/decorators/user.decorator';
import { parseDeliveryman } from '@app/modules/deliveryman/parses/parse-deliveryman.parser';
import { CreateDeliverymanValidationPipe } from '@app/modules/deliveryman/pipes/create-deliveryman.pipe';
import { Parser } from '@app/shared/decorators/parser.decorator';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { DeliveryService } from '@core/services/delivery.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Deliveryman')
@Controller('deliveryman')
export class DeliverymanController {
    constructor(
        private readonly deliverymanService: DeliveryManService,
        private readonly deliveryService: DeliveryService,
    ) {}

    @ApiProperty({ description: 'Get all deliveryman' })
    @ApiBearerAuth('Deliveryman')
    @Role('deliveryman')
    @Get()
    async getAllDeliveryman(): Promise<Deliveryman[]> {
        return this.deliverymanService.getAll();
    }

    @ApiProperty({ description: 'Create a new Deliveryman' })
    @Post()
    @Public()
    @Parser(parseDeliveryman)
    async createDeliveryman(@Body() data: CreateDeliverymanValidationPipe) {
        return this.deliverymanService.createDeliveryman(data);
    }

    @ApiBearerAuth('Deliveryman')
    @Role('deliveryman')
    @Get('myDeliveries')
    async getAllDeliverymanDeliveries(@User('id') deliveryman_id: string) {
        return this.deliveryService.findAllDeliverymanDeliveries(deliveryman_id);
    }
}
