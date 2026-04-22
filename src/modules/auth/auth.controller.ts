import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { View } from '../../common/decorators/view.decorator';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

// Define a type-safe request interface for Passport
interface RequestWithUser extends Request {
  user: Omit<User, 'password'>;
  logIn(user: any, cb: (err: any) => void): void;
  logout(cb: (err: any) => void): void;
  isAuthenticated(): boolean;
  session: any;
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.isAuthenticated();
  }
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  @View('auth/login')
  async getLogin(@Req() req: RequestWithUser) {
    if (req.isAuthenticated()) {
      return { redirect: '/wilayah' };
    }
    return {
      title: 'Login - My Sawit',
      layout: false, // Matikan layout utama khusus untuk halaman login
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: RequestWithUser, @Res() res: Response): Promise<void> {
    // Manually call login as a fail-safe for session persistence
    req.logIn(req.user, (err: any) => {
      if (err) {
        return res.redirect('/auth/login');
      }
      req.session.save(() => {
        const accept = req.headers['accept'] || '';
        if (accept.includes('application/json') && !accept.includes('text/html')) {
          return res.json(req.user);
        }
        res.redirect('/wilayah');
      });
    });
  }

  @Get('logout')
  logout(@Req() req: RequestWithUser, @Res() res: Response): void {
    req.logout(() => {
      res.redirect('/auth/login');
    });
  }

  // Temporary route to seed admin user
  @Get('seed')
  async seed() {
    await this.authService.createInitialUser();
    return { message: 'Seed successful' };
  }
}
