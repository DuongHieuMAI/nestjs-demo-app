import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 64)
  readonly displayName: string;
  @IsEmail()
  readonly email: string;
}

// export class CreateUserDto {
//   readonly displayName: string;
//   readonly email: string;
// }