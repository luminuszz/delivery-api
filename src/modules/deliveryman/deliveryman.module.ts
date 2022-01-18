import { DeliverymanController } from '@app/modules/deliveryman/deliveryman.controller';
import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(DeliverymanRepository)],
    providers: [DeliverymanServiceProvider],
    controllers: [DeliverymanController],
})
export class DeliverymanModule {}
