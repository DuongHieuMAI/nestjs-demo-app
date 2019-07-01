import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 64)
  readonly display_name: string;
  
  @IsEmail()
  readonly email: string;
}