import {Public} from '@app/modules/auth/decorators/public.decorator';
import {Role} from '@app/modules/auth/decorators/role.decorator';
import {User} from '@app/modules/auth/decorators/user.decorator';
import {parseClientParser} from '@app/modules/client/parses/parseClient.parser';
import {parseClientsParser} from '@app/modules/client/parses/parserClients.parser';
import {CreateClientValidatorPipe} from '@app/modules/client/pipes/create-client.pipe';
import {Parser} from '@app/shared/decorators/parser.decorator';
import {ClientService} from '@core/services/client.service';
import {DeliveryService} from '@core/services/delivery.service';
import {Body, Controller, Get, Post} from '@nestjs/common';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService, private readonly deliveryService: DeliveryService) {
    }

    @Public()
    @Post()
    @Parser(parseClientParser)
    async createClient(@Body() data: CreateClientValidatorPipe) {
        return this.clientService.createClient(data);
    }

    @Role('client')
    @Get()
    @Parser(parseClientsParser)
    async getAllClients() {
        return this.clientService.getAllClients();
    }

    @Role('client')
    @Get('myDeliveries')
    async getAllDeliveriesCleint(@User('id') client_id: string) {
        return this.deliveryService.findAllClientDeliveries(client_id);
    }
}
