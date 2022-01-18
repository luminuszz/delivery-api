import { ClientMemoryRepository } from '@app/modules/persistence/adpaters/memory/client.memory.repository';
import { DeliveryMemoryRepository } from '@app/modules/persistence/adpaters/memory/delivery.memory.repository';
import { DeliverymanMemoryRepository } from '@app/modules/persistence/adpaters/memory/deliveryman.memory.repository';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

const memoryRepositories = {
    DeliverymanRepository: DeliverymanMemoryRepository,
    ClientRepository: ClientMemoryRepository,
    DeliveryRepository: DeliveryMemoryRepository,
};

type RepositoryContract = Type | Type[];

@Module({})
export class MemoryModule {
    static forFeature(repository: RepositoryContract): DynamicModule {
        const providersMap = new Map<string, Provider>();
        const providers: Provider[] = [];

        const isArrayOfRepositories = Array.isArray(repository);

        !!isArrayOfRepositories
            ? repository.forEach((item) => {
                  providersMap.set(item.name, {
                      provide: item,
                      useClass: memoryRepositories[item.name],
                  });
              })
            : providersMap.set(repository.name, {
                  provide: repository,
                  useClass: memoryRepositories[repository.name],
              });

        providersMap.forEach((item) => {
            providers.push(item);
        });

        return {
            module: MemoryModule,
            providers,
            exports: providers,
        };
    }
}
