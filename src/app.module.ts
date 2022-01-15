import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { PersistenceModule, PersistentType } from '@app/modules/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DeliverymanModule,
        PersistenceModule.forRoot(process.env.PERSISTENCE_TYPE as PersistentType),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
