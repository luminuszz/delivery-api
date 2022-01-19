import { WithJwt, User } from '@app/modules/auth/guards/jwt.guard';
import { parserClient } from '@app/modules/client/parses/parserClient';
import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { Parser } from '@app/shared/decorators/parser.decorator';
import { PayloadToken } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @Parser(parserClient)
    async createClient(@Body() data: CreateClientValidatorPipe) {
        return this.clientService.createClient(data);
    }

    @WithJwt()
    @Get()
    @Parser(parserClient)
    async getAllClients(@User() data: PayloadToken) {
        return this.clientService.getAllClients();
    }
}
