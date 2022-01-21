import {Test} from '@nestjs/testing';

import {PrismaService} from './prisma.service';

describe('app -> prismaService', () => {
    let prismaService: PrismaService;

    beforeAll(async () => {
        const ref = await Test.createTestingModule({
            providers: [PrismaService],
        }).compile();

        prismaService = ref.get<PrismaService>(PrismaService);
    });

    it('should be able to starts prisma services on module init', async () => {
        const refMethod = jest.spyOn(prismaService, 'onModuleInit');

        expect(refMethod).toBeDefined();
    });

    it('should be able to end prisma services on module finish', async () => {
        const refMethod = jest.spyOn(prismaService, 'onModuleDestroy');

        expect(refMethod).toBeDefined();
    });
});
