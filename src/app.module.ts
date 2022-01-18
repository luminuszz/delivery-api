import { AuthModule } from '@app/modules/auth/auth.module';
import { ClientModule } from '@app/modules/client/client.module';
import { DeliveryModule } from '@app/modules/delivery/delivery.module';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { PersistenceModule, PersistentType } from '@app/modules/persistence/persistence.module';
import { TransformResponseInterceptor } from '@app/shared/interceptors/tranformResponse.interceptor';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PersistenceModule.forRoot(process.env.PERSISTENCE_TYPE as PersistentType),
        DeliverymanModule,
        DeliveryModule,
        ClientModule,
        AuthModule,
    ],

    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
    ],
})
export class AppModule {}
