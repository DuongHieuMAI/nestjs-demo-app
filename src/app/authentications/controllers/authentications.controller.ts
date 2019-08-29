import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationsService } from '../services/authentications.service';

@Controller('authentications')
export class AuthenticationsController {

  constructor(private readonly authService: AuthenticationsService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }
}