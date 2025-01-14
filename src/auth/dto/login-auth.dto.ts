import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsOptional()
  LOGIN: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsOptional()
  EMAIL_DE_LOGIN: string;

  @IsString()
  @MinLength(6)
  SENHA?: string;
}
