import { WithJwt } from '@app/modules/auth/decorators/withJwt.decorator';
import { parseClientParser } from '@app/modules/client/parses/parseClient.parser';
import { parseClientsParser } from '@app/modules/client/parses/parserClients.parser';
import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { Parser } from '@app/shared/decorators/parser.decorator';
import { ClientService } from '@core/services/client.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @Parser(parseClientParser)
    async createClient(@Body() data: CreateClientValidatorPipe) {
        return this.clientService.createClient(data);
    }

    @WithJwt()
    @Get()
    @Parser(parseClientsParser)
    async getAllClients() {
        return this.clientService.getAllClients();
    }
}
