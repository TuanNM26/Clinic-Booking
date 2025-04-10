import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/authGuards';
import { PermissionGuard } from '../guards/permissonGuard';

export function Auth(permissions: string[] = []): MethodDecorator {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard, PermissionGuard)
  );
}
