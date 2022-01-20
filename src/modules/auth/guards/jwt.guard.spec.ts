import jwtConfig from '@app/config/jwt.config';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt.guard';
import { JwtStrategy } from '@app/modules/auth/jwt.strategy';
import { PayloadToken } from '@core/services/auth.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('JwtAuthGuard', () => {
    let jwtAuthGuard: JwtAuthGuard;
    let reflector: Reflector;
    let jwtService: JwtService;
    let mockExecutionContext: (authToken?: string, getClass?: any, getHandler?: any) => ExecutionContext;

    beforeAll(async () => {
        const ref = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: jwtConfig.secret,
                    signOptions: {
                        expiresIn: jwtConfig.expires,
                    },
                }),
            ],
            providers: [JwtAuthGuard, JwtStrategy, Reflector],
        }).compile();

        jwtAuthGuard = ref.get<JwtAuthGuard>(JwtAuthGuard);
        reflector = ref.get<Reflector>(Reflector);
        jwtService = ref.get<JwtService>(JwtService);
    });

    beforeEach(() => {
        mockExecutionContext = (authToken?: string, getClass?: any, getHandler?: any) =>
            ({
                getHandler: jest.fn().mockReturnValue(getHandler),
                getClass: jest.fn().mockReturnValue(getClass),
                switchToHttp: jest.fn().mockReturnValue({
                    getRequest: jest.fn().mockReturnValue({ headers: { authorization: `Bearer ${authToken || ''}` } }),
                    getResponse: jest.fn(),
                }),
            } as any);

        jest.clearAllMocks();
    });

    it('should be able to be pass jwt validation with valid jwt token', async () => {
        const jwtToken = jwtService.sign({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            userType: 'client',
        } as PayloadToken);

        jest.spyOn(reflector, 'get').mockReturnValue(undefined);

        const results = await jwtAuthGuard.canActivate(mockExecutionContext(jwtToken));

        expect(results).toBeTruthy();
    });

    it('should not be able to apply jwt authorization if IS_PUBLIC_METHOD_METADATA_KEY to be true', async () => {
        jest.spyOn(reflector, 'get').mockReturnValue(true);

        const results = await jwtAuthGuard.canActivate(mockExecutionContext());

        expect(results).toBeTruthy();
    });

    it('not should be able to be pass jwt validation with invalid token jwt token', async () => {
        jest.spyOn(reflector, 'get').mockReturnValue(undefined);

        await expect(jwtAuthGuard.canActivate(mockExecutionContext())).rejects.toBeInstanceOf(UnauthorizedException);
    });
});
