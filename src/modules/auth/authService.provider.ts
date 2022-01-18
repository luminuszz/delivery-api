import { HashProvider } from '@core/ports/hash.provider';
import { AuthService } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const AuthServiceProvider: Provider = {
    provide: AuthService,
    useFactory: (
        clientService: ClientService,
        deliverymanService: DeliveryManService,
        hashProvider: HashProvider,
        jwtService: JwtService,
    ) => new AuthService(clientService, deliverymanService, hashProvider, jwtService),
    inject: [ClientService, DeliveryManService, HashProvider, JwtService],
};
