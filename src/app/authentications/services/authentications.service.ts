import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByToken(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }

  // async validateUserByEmailAndPassword(loginUserDto: LoginUserDto): Promise<any> {
  //   const user = this.usersService.findOneByEmailAndPassword(loginUserDto.email, loginUserDto.password);
  //   return user;
  // }

  async validateUserByEmailAndPassword(email: string, password: string): Promise<any> {
    const result = await this.usersService.findOneByEmailAndPassword(email, password);
    if (result.length === 0) {
      throw new NotFoundException('Email or Password was not found');
    }
    return result[0];
  }

  async generateJWT(user: UserEntity) {
    console.log('generate token', user);
    const jwtPayload: JwtPayload = {email: user.email, password: user.password};
    console.log(jwtPayload);
    const result = {
      access_token: this.jwtService.sign(jwtPayload),
      // access_token: 12334,
    };
    console.log(result);
    return result;
  }
}
