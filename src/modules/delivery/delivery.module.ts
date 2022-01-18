import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { DeliveryRepository } from '@core/ports/delivery.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliveryRepository)],
    providers: [DeliveryServiceProvider],
    exports: [DeliveryServiceProvider],
})
export class DeliveryModule {}
