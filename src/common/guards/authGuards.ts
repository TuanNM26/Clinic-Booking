import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import  AuthService  from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization;
    
    if (!bearerToken) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const token = bearerToken.split(' ')[1];

    try {
      const decoded: any = await this.authService.verify(
        token,
        this.configService.get<string>('ACCESS_KEY'),
      );
      console.log(decoded);
      request.user = decoded; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
