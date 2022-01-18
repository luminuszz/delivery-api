import { MemoryModule } from '@app/modules/persistence/adpaters/memory/memory.module';
import { PrismaModule } from '@app/modules/persistence/adpaters/prisma/prisma.module';
import { Module, Global, DynamicModule } from '@nestjs/common';

export const PERSISTENCE_TYPE = 'PERSISTENCE_TYPE';

export enum PersistentType {
    PRISMA = 'PRISMA',
    MEMORY = 'MEMORY',
}

type PersistentTypeKeys = keyof typeof PersistentType;

@Global()
@Module({})
export class PersistenceModule {
    static forRoot(type: PersistentType): DynamicModule {
        const persistentModules: Record<PersistentTypeKeys, DynamicModule> = {
            MEMORY: {
                module: PersistenceModule,
                providers: [
                    {
                        provide: PERSISTENCE_TYPE,
                        useValue: type,
                    },
                ],

                exports: [PERSISTENCE_TYPE],
            },
            PRISMA: {
                module: PersistenceModule,
                imports: [PrismaModule],
                providers: [
                    {
                        provide: PERSISTENCE_TYPE,
                        useValue: type,
                    },
                ],
                exports: [PERSISTENCE_TYPE],
            },
        };

        return persistentModules[type];
    }

    static forFeature(repository: any, type?: PersistentType) {
        switch (type || process.env.PERSISTENCE_TYPE) {
            case PersistentType.MEMORY:
                return MemoryModule.forFeature(repository);

            case PersistentType.PRISMA:
                return PrismaModule.forFeature(repository);
        }
    }
}
