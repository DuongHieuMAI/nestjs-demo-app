import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationsService } from '../authentications.service';
import { JwtPayload } from '../interfaces/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly authenticationService: AuthenticationsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearToken(),
      secretOrKey: 'secretkey',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authenticationService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}