import { DeliveryController } from '@app/modules/delivery/delivery.controller';
import { DeliveryServiceProvider } from '@app/modules/delivery/deliveryService.provider';
import { DeliverymanModule } from '@app/modules/deliveryman/deliveryman.module';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import {DeliveryRepository} from '@core/ports/delivery.repository';
import {forwardRef, Module} from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliveryRepository), forwardRef(() => DeliverymanModule)],
    providers: [DeliveryServiceProvider],
    exports: [DeliveryServiceProvider],
    controllers: [DeliveryController],
})
export class DeliveryModule {}
