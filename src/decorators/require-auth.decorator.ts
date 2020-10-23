import { SetMetadata } from '@nestjs/common';

export const RequireAuthorized = (...isAuthorized: boolean[]) => SetMetadata('RequireAuthorized', (isAuthorized) ? true : false);