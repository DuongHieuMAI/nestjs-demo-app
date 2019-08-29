import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationsService } from '../services/authentications.service';
import { JwtPayload } from '../interfaces/jwt.payload';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly authenticationService: AuthenticationsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authenticationService.validateUserByToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}