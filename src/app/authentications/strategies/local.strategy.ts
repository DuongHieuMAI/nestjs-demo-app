import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationsService } from '../services/authentications.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationsService) {
    super({
        usernameField: 'email',
        passwordField: 'password',
      },
      async (
        username: string,
        password: string,
        next: Function,
      ) => await this.validate(username, password, next),
    );
  }

  async validate(email: string, password: string, done: Function): Promise<any> {
    let user;
    try {
      user = await this.authService.validateUserByEmailAndPassword(email, password);
    } catch (e) {
      return done(e, false);
    }
    // if (!user) {
    //   console.log('validate', user);
    //   throw new UnauthorizedException();
    // }
    // return user;
    // if (!user) {
    //   return done(new UnauthorizedException(), false);
    // }
    done(null, user);
  }
}