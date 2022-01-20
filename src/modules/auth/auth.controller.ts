import { Public } from '@app/modules/auth/decorators/public.decorator';
import { CreateClientSessionPipe } from '@app/modules/auth/pipes/create-client-session.pipe';
import { CreateDeliverymanSessionPipe } from '@app/modules/auth/pipes/create-deliveryman-session.pipe';
import { AuthService } from '@core/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('client/login')
    async createClientSession(@Body() data: CreateClientSessionPipe) {
        return this.authService.validateClient(data);
    }

    @Public()
    @Post('deliveryman/login')
    async createDeliverymanSession(@Body() data: CreateDeliverymanSessionPipe) {
        return this.authService.validateDeliveryman(data);
    }
}
