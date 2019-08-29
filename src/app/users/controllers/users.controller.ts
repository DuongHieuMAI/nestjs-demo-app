import {
  Controller,
  Post,
  Get,
  Body,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Request, UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { AnyExceptionFilter } from '../../../core/exceptions/http-exception.filter';
// import { ValidationPipe } from './pipes/validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(
    @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    console.log('here');
    return req.user;
  }

}
