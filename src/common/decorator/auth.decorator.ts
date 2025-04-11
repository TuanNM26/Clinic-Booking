import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/authGuards';

export function Auth(permissions: string[] = []): MethodDecorator {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard)
  );
}
