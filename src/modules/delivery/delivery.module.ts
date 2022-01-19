import { DeliveryController } from '@app/modules/delivery/delivery.controller';
import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliveryRepository)],
    providers: [DeliveryServiceProvider],
    exports: [DeliveryServiceProvider],
    controllers: [DeliveryController],
})
export class DeliveryModule {}
