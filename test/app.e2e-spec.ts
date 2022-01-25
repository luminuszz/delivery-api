import { AppModule } from '@app/app.module';
import { CreateClientValidatorPipe } from '@app/modules/client/pipes/create-client.pipe';
import { CreateDeliverymanValidationPipe } from '@app/modules/deliveryman/pipes/create-deliveryman.pipe';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';

describe('DeliverymanController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/deliveryman (POST)', async () => {
        const payloadRequest: CreateDeliverymanValidationPipe = {
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        };

        return request(app.getHttpServer())
            .post('/deliveryman')
            .send(payloadRequest)
            .expect(201)
            .then(({ body }) => expect(body).toHaveProperty('id'));
    });

    afterAll(async () => {
        await app.close();
    });
});

describe('ClientController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/client (POST)', async () => {
        const payloadRequest: CreateClientValidatorPipe = {
            username: faker.name.firstName(),
            password: faker.random.alpha(),
        };

        return request(app.getHttpServer())
            .post('/client')
            .send(payloadRequest)
            .set('Accept', 'application/json')
            .expect(201)
            .then(({ body }) => expect(body).toHaveProperty('id'));
    });

    afterAll(async () => {
        await app.close();
    });
});
