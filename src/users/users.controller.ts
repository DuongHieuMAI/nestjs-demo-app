import { Controller, Post, Get, Body, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { AnyExceptionFilter } from '../core/exceptions/http-exception.filter';
// import { ValidationPipe } from './pipes/validation.pipe';

@Controller('users')
@UseFilters(new AnyExceptionFilter())
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(
    @Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    console.log('to here');
    return this.usersService.findAll();
  }
}
