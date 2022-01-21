import {DeliveryModule} from '@app/modules/delivery/delivery.module';
import {DeliverymanController} from '@app/modules/deliveryman/deliveryman.controller';
import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import {DeliverymanRepository} from '@core/ports/deliveryman.repository';
import {forwardRef, Module} from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliverymanRepository), HashModule, forwardRef(() => DeliveryModule)],
    providers: [DeliverymanServiceProvider],
    controllers: [DeliverymanController],
    exports: [DeliverymanServiceProvider],
})
export class DeliverymanModule {}
