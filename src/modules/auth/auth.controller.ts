import { CreateClientSessionPipe } from '@app/modules/auth/pipes/create-client-session.pipe';
import { CreateDeliverymanSessionPipe } from '@app/modules/auth/pipes/create-deliveryman-session.pipe';
import { AuthService } from '@core/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('client/login')
    async createClientSession(@Body() data: CreateClientSessionPipe) {
        return this.authService.validateClient(data);
    }

    @Post('deliveryman/login')
    async createDeliverymanSession(@Body() data: CreateDeliverymanSessionPipe) {
        return this.authService.validateDeliveryman(data);
    }
}
