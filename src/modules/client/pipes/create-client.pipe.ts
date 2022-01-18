import { CreateClientDto } from '@core/dto/create-client.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientValidatorPipe implements CreateClientDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
