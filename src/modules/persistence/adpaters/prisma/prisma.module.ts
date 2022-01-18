import { ClientPrismaRepository } from '@app/modules/persistence/adpaters/prisma/client.prisma.repository';
import { DeliveryPrismaRepository } from '@app/modules/persistence/adpaters/prisma/delivery.prisma.repository';
import { DeliverymanPrismaRepository } from '@app/modules/persistence/adpaters/prisma/deliveryman.prisma.repository';
import { PrismaService } from '@app/modules/persistence/adpaters/prisma/prisma.service';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

type RepositoryContract = Type | Type[];

const prismaRepository = {
    DeliverymanRepository: DeliverymanPrismaRepository,
    ClientRepository: ClientPrismaRepository,
    DeliveryRepository: DeliveryPrismaRepository,
};

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {
    static forFeature(repository: RepositoryContract): DynamicModule {
        const map = new Map<string, Provider>();
        const providers: Provider[] = [];

        const isArrayOfRepositories = Array.isArray(repository);

        !!isArrayOfRepositories
            ? repository.forEach((item) => {
                  map.set(item.name, {
                      provide: item,
                      useClass: prismaRepository[item.name],
                  });
              })
            : map.set(repository.name, {
                  provide: repository,
                  useClass: prismaRepository[repository.name],
              });

        map.forEach((provider) => {
            providers.push(provider);
        });

        return {
            module: PrismaModule,
            providers: providers,
            exports: providers,
        };
    }
}
