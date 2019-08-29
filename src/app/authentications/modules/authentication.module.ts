import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../users/modules/users.module';
import { AuthenticationsService } from '../services/authentications.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthenticationsController } from '../controllers/authentications.controller';
import { jwtConstants } from '../constants/jwt.constant';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    // PassportModule,
    UsersModule,
  ],
  providers: [ AuthenticationsService, LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtStrategy, AuthenticationsService],
  controllers: [AuthenticationsController],
})
export class AuthenticationModule {}
