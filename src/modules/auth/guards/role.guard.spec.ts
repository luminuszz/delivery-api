import { RoleGuard } from '@app/modules/auth/guards/role.guard';
import { ClientModule } from '@app/modules/client/client.module';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { PayloadToken } from '@core/services/auth.service';
import { ClientService } from '@core/services/client.service';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

type MockExecutionContext = Partial<Record<jest.FunctionPropertyNames<ExecutionContext>, jest.MockedFunction<any>>>;

describe('RoleGuard', () => {
    let roleGuard: RoleGuard;
    let clientService: ClientService;
    let reflector: Reflector;
    let deliverymanService: DeliveryManService;
    let mockExecutionContext: (vl?: PayloadToken, getClass?: any, getHandler?: any) => MockExecutionContext;

    beforeAll(async () => {
        const ref = await Test.createTestingModule({
            imports: [ClientModule, DeliverymanModule],
            providers: [Reflector, RoleGuard],
        }).compile();

        roleGuard = ref.get<RoleGuard>(RoleGuard);
        clientService = ref.get<ClientService>(ClientService);
        reflector = ref.get<Reflector>(Reflector);
        deliverymanService = ref.get<DeliveryManService>(DeliveryManService);
    });

    beforeEach(() => {
        mockExecutionContext = (payload: PayloadToken, getClass?: any, getHandler?: any) => ({
            getHandler: jest.fn().mockReturnValue(getHandler),
            getClass: jest.fn().mockReturnValue(getClass),
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({ user: payload }),
                getResponse: jest.fn(),
            }),
        });

        jest.clearAllMocks();
    });

    it('should be able to validate client role', async () => {
        const client = await clientService.createClient({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: client.id,
            name: client.username,
            userType: 'client',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('client');

        const response = await roleGuard.canActivate(mockExecutionContext(mockPayloadToken) as ExecutionContext);

        expect(response).toBeTruthy();
    });

    it('should be able to validate client role by handler', async () => {
        const client = await clientService.createClient({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: client.id,
            name: client.username,
            userType: 'client',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('client');

        const response = await roleGuard.canActivate(
            mockExecutionContext(mockPayloadToken, undefined, {}) as ExecutionContext,
        );

        expect(response).toBeTruthy();
    });

    it('should be able to validate client role by class', async () => {
        const client = await clientService.createClient({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: client.id,
            name: client.username,
            userType: 'client',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('client');

        const response = await roleGuard.canActivate(
            mockExecutionContext(mockPayloadToken, {}, null) as ExecutionContext,
        );

        expect(response).toBeTruthy();
    });

    it('should be able to validate deliveryman role', async () => {
        const deliveryman = await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: deliveryman.id,
            name: deliveryman.username,
            userType: 'deliveryman',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('deliveryman');

        const response = await roleGuard.canActivate(mockExecutionContext(mockPayloadToken) as ExecutionContext);

        expect(response).toBeTruthy();
    });

    it('should be able to validate deliveryman role by handler', async () => {
        const deliveryman = await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: deliveryman.id,
            name: deliveryman.username,
            userType: 'deliveryman',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('deliveryman');

        const response = await roleGuard.canActivate(
            mockExecutionContext(mockPayloadToken, undefined, {}) as ExecutionContext,
        );

        expect(response).toBeTruthy();
    });

    it('should be able to validate deliveryman role by class', async () => {
        const deliveryman = await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: deliveryman.id,
            name: deliveryman.username,
            userType: 'deliveryman',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('deliveryman');

        const response = await roleGuard.canActivate(
            mockExecutionContext(mockPayloadToken, {}, undefined) as ExecutionContext,
        );

        expect(response).toBeTruthy();
    });

    it('not should be able to pass if user role is wrong', async () => {
        const deliveryman = await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: deliveryman.id,
            name: deliveryman.username,
            userType: 'deliveryman',
        };

        jest.spyOn(reflector, 'get').mockReturnValue('client');

        await expect(
            roleGuard.canActivate(mockExecutionContext(mockPayloadToken) as ExecutionContext),
        ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should be able to pass if not  exists role metadata', async () => {
        const deliveryman = await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        });

        const mockPayloadToken: PayloadToken = {
            id: deliveryman.id,
            name: deliveryman.username,
            userType: 'deliveryman',
        };
        jest.spyOn(reflector, 'get').mockReturnValue(undefined);

        const reuslts = await roleGuard.canActivate(mockExecutionContext(mockPayloadToken) as ExecutionContext);

        expect(reuslts).toBeTruthy();
    });

    it('not should be able to pass if not  exists req user', async () => {
        jest.spyOn(reflector, 'get').mockReturnValue('client');

        await expect(roleGuard.canActivate(mockExecutionContext(undefined) as ExecutionContext)).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
    });
});
