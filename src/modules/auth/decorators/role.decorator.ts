import { ROLE_METADATA_KEY, RoleGuard } from '@app/modules/auth/guards/role.guard';
import { UserType } from '@core/services/auth.service';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const Role = (role: UserType) => applyDecorators(SetMetadata(ROLE_METADATA_KEY, role), UseGuards(RoleGuard));
