import { PayloadToken, UserType } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLE_METADATA_KEY = 'ROLE_METADATA_KEY';

@Injectable()
export class RoleGuard implements CanActivate {
    private log = new Logger();

    constructor(
        private readonly deliveryManService: DeliveryManService,
        private readonly clientService: ClientService,
        private readonly reflector: Reflector,
    ) {}

    private async deliveryman(id: string): Promise<boolean> {
        const deliveryman = await this.deliveryManService.findUserDeliverymanById(id);

        return !!deliveryman;
    }

    private async client(id: string): Promise<boolean> {
        const client = await this.clientService.findClientById(id);

        console.log({
            client,
        });

        return !!client;
    }

    async canActivate(context: ExecutionContext) {
        const role: UserType =
            this.reflector.get(ROLE_METADATA_KEY, context.getHandler()) ||
            this.reflector.get(ROLE_METADATA_KEY, context.getClass());

        if (!role) return true;

        const { user } = context.switchToHttp().getRequest() as { user: PayloadToken };

        console.log({ user });

        if (!user) throw new UnauthorizedException();

        const validate = await this[role](user.id);

        if (!validate) {
            throw new UnauthorizedException();
        } else {
            return true;
        }
    }
}
