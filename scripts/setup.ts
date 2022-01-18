import * as dotenv from 'dotenv';
import { resolve } from 'path';

export default () => {
    const path = resolve(__dirname, '..', '.env.test');

    dotenv.config({ path });

    console.log({
        t: process.env.PERSISTENCE_TYPE,
    });
};
