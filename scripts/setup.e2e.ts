import * as shelljs from 'shelljs';
import { uuid } from 'uuidv4';

export default async () => {
    const database_name = process.env.DB_NAME || `db_test_${uuid()}`;

    console.log(`run migrations -> ${database_name} ...`);

    await shelljs.exec('yarn prisma migrate dev  --create-only');

    console.log({
        p: process.env.PERSISTENCE_TYPE,
        message: 'init e2e tests',
    });
};
