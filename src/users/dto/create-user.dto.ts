import { IsEmail, IsString, Length } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class CreateUserDto implements User {
  @IsString()
  @Length(3, 64)
  readonly displayName: string;
  @IsEmail()
  readonly email: string;
  readonly id: string;
}
