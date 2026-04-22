import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticatedGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = request.isAuthenticated();
    
    this.logger.log(`Path: ${request.url}`);
    this.logger.log(`Is Authenticated: ${isAuth}`);
    this.logger.log(`Session ID: ${request.sessionID}`);
    this.logger.log(`User in Request: ${JSON.stringify(request.user)}`);
    
    return isAuth;
  }
}
