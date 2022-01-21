import { ClientController } from '@app/modules/client/client.controller';
import { ClientServiceProvider } from '@app/modules/client/clientService.provider';
import { DeliveryModule } from '@app/modules/delivery/delivery.module';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { ClientRepository } from '@core/ports/client.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [PersistenceModule.forFeature(ClientRepository), HashModule, DeliveryModule],
    providers: [ClientServiceProvider],
    controllers: [ClientController],
    exports: [ClientServiceProvider],
})
export class ClientModule {}
