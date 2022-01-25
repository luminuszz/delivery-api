import * as shelljs from 'shelljs';

export default async () => {
    await shelljs.exec('yarn prisma migrate reset --force');
};
