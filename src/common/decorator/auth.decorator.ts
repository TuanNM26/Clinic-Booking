import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enum/roles.enum';
import { AuthGuardService } from '../guards/authGuards.service';

export function Auth(roles: Role[] = []): MethodDecorator {
    return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuardService));
  }
