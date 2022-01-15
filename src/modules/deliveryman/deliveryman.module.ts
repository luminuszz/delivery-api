import { DeliverymanController } from '@app/modules/deliveryman/deliveryman.controller';
import { DeliveryServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliverymanRepository)],
    controllers: [DeliverymanController],
    providers: [DeliveryServiceProvider],
})
export class DeliverymanModule {}
