import { Client } from '@core/entities/client.entity';

type Response = Omit<Client, 'password'>;

export function parserClient(response: Client[]): Response[] {
    return response.map((item) => {
        delete item.password;

        return item;
    });
}
