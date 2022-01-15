import { DeliverymanMemoryRepository } from '@app/modules/persistence/adpaters/memory/deliveryman.memory.repository';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

const memoryRepositories = {
    DeliverymanRepository: DeliverymanMemoryRepository,
};

type RepositoryContract = Type | Type[];

@Module({})
export class MemoryModule {
    static forFeature(repository: RepositoryContract): DynamicModule {
        const providersMap = new Map<string, Provider>();

        const isArrayOfRepositories = Array.isArray(repository);

        if (isArrayOfRepositories) {
            repository.forEach((item) => {
                providersMap.set(item.name, {
                    provide: item,
                    useClass: memoryRepositories[item.name],
                });
            });
        } else {
            providersMap.set(repository.name, {
                provide: repository,
                useClass: memoryRepositories[repository.name],
            });
        }

        const providers: Provider[] = [];

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
