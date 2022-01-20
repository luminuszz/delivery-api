import jwtConfig from '@app/config/jwt.config';
import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthServiceProvider } from '@app/modules/auth/authService.provider';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt.guard';
import { JwtStrategy } from '@app/modules/auth/jwt.strategy';
import { ClientModule } from '@app/modules/client/client.module';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        DeliverymanModule,
        ClientModule,
        HashModule,
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expires,
            },
        }),
    ],
    providers: [AuthServiceProvider, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthServiceProvider],
})
export class AuthModule {}
