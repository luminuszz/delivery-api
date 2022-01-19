import { PayloadToken, UserType } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLE_METADATA_KEY = 'ROLE_METADATA_KEY';

@Injectable()
export class RoleGuard implements CanActivate {
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

        return !!client;
    }

    async canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest() as { user: PayloadToken };

        if (!user) throw new UnauthorizedException();

        const role: UserType =
            this.reflector.get(ROLE_METADATA_KEY, context.getHandler()) ||
            this.reflector.get(ROLE_METADATA_KEY, context.getClass());

        if (!role) return true;

        const validate = await this[role](user.id);

        if (!validate) {
            throw new UnauthorizedException();
        } else {
            return true;
        }
    }
}
