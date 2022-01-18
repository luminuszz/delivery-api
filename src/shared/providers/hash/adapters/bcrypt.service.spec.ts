import { BcryptHashService } from '@app/shared/providers/hash/adapters/bcrypt.service';
import { Test } from '@nestjs/testing';

describe('app -> brcryptService', () => {
    let service: BcryptHashService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [BcryptHashService],
        }).compile();

        service = moduleRef.get<BcryptHashService>(BcryptHashService);
    });

    it('should be able to hash a value', async () => {
        const ORIGINAL_VALUE = 'ORIGINAL_VALUE';

        const hash = await service.hash(ORIGINAL_VALUE);

        expect(typeof hash).toBe('string');
        expect(ORIGINAL_VALUE).not.toEqual(hash);
    });

    it('should be able to compare a hash value to original value', async () => {
        const ORIGINAL_VALUE = 'ORIGINAL_VALUE';

        const hash = await service.hash(ORIGINAL_VALUE);

        const results = await service.compare(ORIGINAL_VALUE, hash);

        expect(results).toBeTruthy();
        expect(results).toBe(true);
    });

    it('should be able to return false if hash does not  match with value', async () => {
        const ORIGINAL_VALUE = 'ORIGINAL_VALUE';

        const hash = await service.hash(ORIGINAL_VALUE);

        const results = await service.compare('OTHER_VALUE', hash);

        expect(results).toBeFalsy();
        expect(results).toBe(false);
    });
});
