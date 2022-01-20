import { IS_PUBLIC_METHOD_METADATA_KEY } from '@app/modules/auth/guards/jwt.guard';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC_METHOD_METADATA_KEY, true);
