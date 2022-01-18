import jwtConfig from '@app/config/jwt.config';
import { AuthServiceProvider } from '@app/modules/auth/authService.provider';
import { ClientServiceProvider } from '@app/modules/client/clientService.provider';
import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { UnauthorizedException } from '@core/errors/unauthorizedException.error';
import { ClientRepository } from '@core/ports/client.repository';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { AuthService } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('core -> authService', () => {
    let authService: AuthService;
    let clientService: ClientService;
    let deliverymanService: DeliveryManService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                PersistenceModule.forFeature([DeliverymanRepository, ClientRepository]),
                HashModule,
                JwtModule.register({
                    secret: jwtConfig.secret,
                    signOptions: {
                        expiresIn: jwtConfig.expires,
                    },
                }),
            ],
            providers: [AuthServiceProvider, ClientServiceProvider, DeliverymanServiceProvider],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        clientService = module.get<ClientService>(ClientService);
        deliverymanService = module.get<DeliveryManService>(DeliveryManService);
    });

    it('should be able to authorize a client', async () => {
        const newClient = {
            username: faker.name.findName(),
            password: faker.random.word(),
        };

        await clientService.createClient(newClient);

        const results = await authService.validateClient({
            username: newClient.username,
            password: newClient.password,
        });

        expect(results).toHaveProperty('accessToken');
        expect(results).toBeTruthy();
    });

    describe('validateClient', () => {
        it('client -> should be error if username is invalid', async () => {
            const newClient = {
                username: faker.name.findName(),
                password: faker.random.word(),
            };

            const INVALID_USERNAME = 'INVALID_USERNAME';

            await clientService.createClient(newClient);

            await expect(
                authService.validateClient({
                    username: INVALID_USERNAME,
                    password: newClient.password,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
        it('client ->  should be error if password is invalid', async () => {
            const newClient = {
                username: faker.name.findName(),
                password: faker.random.word(),
            };

            const INVALID_PASSWORD = 'INVALID_PASSWORD';

            await clientService.createClient(newClient);

            await expect(
                authService.validateClient({
                    username: newClient.username,
                    password: INVALID_PASSWORD,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
    });

    describe('validateDeliveryman', () => {
        it('should be able to authorize a deliveryman', async () => {
            const newDeliveryman = {
                username: faker.name.findName(),
                password: faker.random.word(),
            };

            await deliverymanService.createDeliveryman(newDeliveryman);

            const results = await authService.validateDeliveryman({
                username: newDeliveryman.username,
                password: newDeliveryman.password,
            });

            expect(results).toHaveProperty('accessToken');
            expect(results).toBeTruthy();
        });

        it('deliveryman -> should be error if username is invalid', async () => {
            const newDeliveryman = {
                username: faker.name.firstName(),
                password: faker.random.word(),
            };

            const INVALID_USERNAME = 'INVALID_USERNAME_DELIVERYMAN';

            await deliverymanService.createDeliveryman(newDeliveryman);

            await expect(
                authService.validateDeliveryman({
                    username: INVALID_USERNAME,
                    password: newDeliveryman.password,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
        it('deliveryman ->  should be error if password is invalid', async () => {
            const newDeliveryman = {
                username: faker.name.firstName(),
                password: faker.random.word(),
            };

            const INVALID_PASSWORD = 'INVALID_PASSWORD';

            await deliverymanService.createDeliveryman(newDeliveryman);

            await expect(
                authService.validateDeliveryman({
                    username: newDeliveryman.username,
                    password: INVALID_PASSWORD,
                }),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
    });
});
