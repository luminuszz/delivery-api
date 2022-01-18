import jwtConfig from '@app/config/jwt.config';
import { AuthServiceProvider } from '@app/modules/auth/authService.provider';
import { CreateClientSessionPipe } from '@app/modules/auth/pipes/create-client-session.pipe';
import { CreateDeliverymanSessionPipe } from '@app/modules/auth/pipes/create-deliveryman-session.pipe';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { ClientModule } from '../client/client.module';
import { AuthController } from './auth.controller';

describe('app -> AuthController', () => {
    let authController: AuthController;
    let clientService: ClientService;
    let deliverymanService: DeliveryManService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                HashModule,
                ClientModule,
                DeliverymanModule,
                JwtModule.register({
                    secret: jwtConfig.secret,
                    signOptions: {
                        expiresIn: jwtConfig.expires,
                    },
                }),
            ],
            providers: [AuthServiceProvider],
            controllers: [AuthController],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        clientService = moduleRef.get<ClientService>(ClientService);
        deliverymanService = moduleRef.get<DeliveryManService>(DeliveryManService);
    });

    describe('createClientSession', () => {
        it('should be able to create a client session', async () => {
            const newClient = {
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            };

            await clientService.createClient(newClient);

            const results = await authController.createClientSession({
                username: newClient.username,
                password: newClient.password,
            });

            expect(results).toHaveProperty('accessToken');
        });

        it('pipes -> should be validate CreateClientSessionPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateClientSessionPipe();

            dto.username = '';
            dto.password = '';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateClientSessionPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });

    describe('createDeliverymanSession', () => {
        it('should be able to create a deliveryman session', async () => {
            const newDeliveryman = {
                username: faker.name.firstName(),
                password: faker.random.alpha(),
            };

            await deliverymanService.createDeliveryman(newDeliveryman);

            const results = await authController.createDeliverymanSession({
                username: newDeliveryman.username,
                password: newDeliveryman.password,
            });

            expect(results).toHaveProperty('accessToken');
        });

        it('pipes -> should be validate CreateDeliverymanSessionPipe', async () => {
            const target = new ValidationPipe({ transform: true, whitelist: true });

            const dto = new CreateDeliverymanSessionPipe();

            dto.username = '';
            dto.password = '';

            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: CreateDeliverymanSessionPipe,
                data: '',
            };

            await expect(target.transform(dto, metadata)).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
