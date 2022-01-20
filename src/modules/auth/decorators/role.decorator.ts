import { ROLE_METADATA_KEY } from '@app/modules/auth/guards/role.guard';
import { UserType } from '@core/services/auth.service';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const Role = (role: UserType) => applyDecorators(SetMetadata(ROLE_METADATA_KEY, role));
