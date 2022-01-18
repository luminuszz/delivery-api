import { ValidateClientDto } from '@core/dto/validate-client.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientSessionPipe implements ValidateClientDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
