import { JwtAuthGuard } from '@app/modules/auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

export const WithJwt = () => UseGuards(JwtAuthGuard);
