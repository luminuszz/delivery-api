import { ValidateClientDto } from '@core/dto/validate-client.dto';
import { ValidateDeliverymanDto } from '@core/dto/validate-deliveryman.dto';
import { Deliveryman } from '@core/entities/deliveryman.entity';
import { UnauthorizedException } from '@core/errors/unauthorizedException.error';
import { HashProvider } from '@core/ports/hash.provider';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { JwtService } from '@nestjs/jwt';

export type PayloadToken = {
    name: string;
    id: string;
};

export type PromiseWithJWT = Promise<{ accessToken: string }>;

export class AuthService {
    constructor(
        private readonly clientService: ClientService,
        private readonly deliverymanService: DeliveryManService,
        private readonly hashProvider: HashProvider,
        private readonly jwtService: JwtService,
    ) {}

    async validateClient({ password, username }: ValidateClientDto): PromiseWithJWT {
        const client = await this.clientService.findClientByName(username);

        if (!client) {
            throw new UnauthorizedException('username or password invalid');
        }

        const passwordDoesMatch = await this.hashProvider.compare(password, client.password);

        if (!passwordDoesMatch) {
            throw new UnauthorizedException('username or password invalid');
        }

        const payload: PayloadToken = {
            name: client.username,
            id: client.id,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateDeliveryman({ password, username }: ValidateDeliverymanDto): PromiseWithJWT {
        const deliveryman = await this.deliverymanService.findDeliverymanByName(username);

        if (!deliveryman) {
            throw new UnauthorizedException('username or password invalid');
        }

        const passwordDoesMatch = await this.hashProvider.compare(password, deliveryman.password);

        if (!passwordDoesMatch) {
            throw new UnauthorizedException('username or password invalid');
        }

        const payload: PayloadToken = {
            name: deliveryman.username,
            id: deliveryman.id,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
