import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, pass: string): Promise<any> {
    console.log('--- VALIDATING USER:', username);
    const user = await this.authService.validateUser(username, pass);
    if (!user) {
      console.log('--- VALIDATION FAILED for:', username);
      throw new UnauthorizedException();
    }
    console.log('--- VALIDATION SUCCESS for:', username);
    return user;
  }
}

// -- Serializer --
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
    console.log('--- SESSION SERIALIZER INSTANTIATED / LOADED ---');
  }

  serializeUser(user: User, done: (err: Error | null, user: number) => void): void {
    console.log('--- SERIALIZING USER:', user.id);
    done(null, user.id);
  }

  async deserializeUser(payload: string, done: (err: Error | null, user: User | null) => void): Promise<void> {
    console.log('--- DESERIALIZING USER WITH ID:', payload);
    const user = await this.authService.findById(+payload);
    done(null, user);
  }
}
