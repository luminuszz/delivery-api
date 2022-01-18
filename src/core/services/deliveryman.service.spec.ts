import { DeliverymanServiceProvider } from '@app/modules/deliveryman/deliveryService.provider';
import { PersistenceModule } from '@app/modules/persistence/persistence.module';
import { HashModule } from '@app/shared/providers/hash/hash.module';
import { BadPayloadException } from '@core/errors/badPayloadException.error';
import { DeliverymanRepository } from '@core/ports/deliveryman.repository';
import { DeliveryManService } from '@core/services/deliveryman.service';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

describe('core -> deliverymanService', () => {
    let deliverymanService: DeliveryManService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PersistenceModule.forFeature(DeliverymanRepository), HashModule],
            providers: [DeliverymanServiceProvider],
        }).compile();

        deliverymanService = moduleRef.get<DeliveryManService>(DeliveryManService);
    });

    it('should be able to get all deliveryman', async () => {
        await deliverymanService.createDeliveryman({
            username: faker.name.firstName(),
            password: '123456',
        });

        const deliverymans = await deliverymanService.getAll();

        expect(Array.isArray(deliverymans)).toBeTruthy();
        expect(deliverymans).toHaveLength(1);
    });

    describe('createDeliveryman', () => {
        it('should be able to create new deliveryman', async () => {
            const deliveryman = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: '123456',
            });

            expect(deliveryman).toHaveProperty('id');
            expect(deliveryman).toHaveProperty('createdAt');
            expect(deliveryman).toHaveProperty('updatedAt');
            expect('123456').not.toEqual(deliveryman.password);
        });

        it('not should be able to create a new delivery man with same name', async () => {
            const SAME_NAME = faker.name.firstName();

            await deliverymanService.createDeliveryman({
                username: SAME_NAME,
                password: faker.random.word(),
            });

            await expect(
                deliverymanService.createDeliveryman({
                    username: SAME_NAME,
                    password: faker.random.word(),
                }),
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe('findDeliverymanByName', () => {
        it('should be able to find deliveryman by name', async () => {
            const NAME = 'carlosDLc';

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await deliverymanService.createDeliveryman({
                username: NAME,
                password: faker.random.word(),
            });

            const results = await deliverymanService.findDeliverymanByName(NAME);

            expect(results.username).toBe(NAME);
            expect(results).not.toBe(undefined);
        });
        it('not should be able to find deliveryman by name if name not exists', async () => {
            const NOT_EXISTENT_NAME = 'NOT_EXISTENT_NAME';

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await expect(deliverymanService.findDeliverymanByName(NOT_EXISTENT_NAME)).resolves.toBe(undefined);
        });
    });

    describe('findUserDeliverymanById', () => {
        it('should be able to find deliveryman by id', async () => {
            const { id: DELIVERYMAN_ID, username } = await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            const results = await deliverymanService.findUserDeliverymanById(DELIVERYMAN_ID);

            expect(results.id).toBe(DELIVERYMAN_ID);
            expect(results.username).toBe(username);
        });

        it('not should be able to find deliveryman by id with ID not exists', async () => {
            const NOT_EXISTENT_ID = 'NOT_EXISTENT_ID';

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await deliverymanService.createDeliveryman({
                username: faker.name.firstName(),
                password: faker.random.word(),
            });

            await expect(deliverymanService.findUserDeliverymanById(NOT_EXISTENT_ID)).resolves.toBe(undefined);
        });
    });
});
