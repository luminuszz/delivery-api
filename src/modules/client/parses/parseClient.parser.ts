import { Client as ClientData } from '@core/entities/client.entity';

type ResponseType = Omit<ClientData, 'password'>;

export function parseClientParser(data: ClientData): ResponseType {
    delete data.password;

    return data;
}
