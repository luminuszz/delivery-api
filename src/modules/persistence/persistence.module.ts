import { MemoryModule } from '@app/modules/persistence/adpaters/memory/memory.module';
import { PrismaModule } from '@app/modules/persistence/adpaters/prisma/prisma.module';
import { Module, Global, DynamicModule } from '@nestjs/common';

export const PERSISTENCE_TYPE = 'PERSISTENCE_TYPE';

export enum PersistentType {
    PRISMA = 'PRISMA',
    MEMORY = 'MEMORY',
}

@Global()
@Module({})
export class PersistenceModule {
    static forRoot(type: PersistentType): DynamicModule {
        if (type === PersistentType.MEMORY) {
            console.log('t', PersistentType.MEMORY);
            return {
                module: PersistenceModule,
                providers: [
                    {
                        provide: PERSISTENCE_TYPE,
                        useValue: type,
                    },
                ],

                exports: [PERSISTENCE_TYPE],
            };
        }

        return {
            module: PersistenceModule,
            imports: [PrismaModule],
            providers: [
                {
                    provide: PERSISTENCE_TYPE,
                    useValue: type,
                },
            ],
            exports: [PERSISTENCE_TYPE],
        };
    }

    static forFeature(repository: any) {
        switch (process.env.PERSISTENCE_TYPE) {
            case String(PersistentType.PRISMA):
                return PrismaModule.forFeature(repository);

            case PersistentType.MEMORY:
                return MemoryModule.forFeature(repository);
        }
    }
}
