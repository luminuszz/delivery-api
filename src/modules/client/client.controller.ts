import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { ClientService } from '@core/services/client.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() data: CreateClientValidatorPipe) {
        return this.clientService.createClient(data);
    }
}
