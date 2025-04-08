import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from '../enum/roles.enum';
  import AuthService  from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AuthGuardService implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      private readonly authService: AuthService,
      private readonly configService : ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const roles = this.reflector.get<Role[]>('roles', context.getHandler());
      const bearerToken = request?.headers?.authorization;
  
      if (!bearerToken) {
        throw new UnauthorizedException('Missing authorization token');
      }
  
      const token = bearerToken.split(' ')[1];
      
      try {
        const decoded: any = await this.authService.verify(token, this.configService.get<String>("ACCESS_KEY") as string );
        request.user = decoded;
  
        if (roles && roles.length > 0 && !roles.includes(decoded?.role)) {
          throw new ForbiddenException('Insufficient permissions');
        }
  
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  