import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class SingInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
