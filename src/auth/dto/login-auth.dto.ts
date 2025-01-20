import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @IsInt()
  ID_SYSTEM?: number;

  @IsInt()
  ID_LOJA?: number;

  @IsOptional()
  @IsInt()
  ID_DEPARTAMENTO?: number;

  @IsOptional()
  @IsInt()
  ID_USUARIO?: number;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;

  @IsOptional()
  @IsString({ message: 'LOGIN must be a valid string', each: true })
  @MinLength(4)
  LOGIN?: string;

  @IsString({ message: 'SENHA must be a valid string', each: true })
  @MinLength(4)
  SENHA?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID_UUID must be a valid UUIDv4' })
  ID_UUID;

  @IsOptional()
  @IsString({ message: 'IP must be a valid string', each: true })
  IP?: string;

  @IsOptional()
  @IsString({ message: 'VERSAO must be a valid string', each: true })
  VERSAO?: string;

  @IsOptional()
  @IsString({ message: 'RESOLUCAO must be a valid string', each: true })
  RESOLUCAO?: string;

  @IsOptional()
  @IsString({ message: 'BUILD_EXE must be a valid string', each: true })
  BUILD_EXE?: string;

  @IsOptional()
  @IsString({ message: 'PC_NAME must be a valid string', each: true })
  PC_NAME?: string;

  @IsOptional()
  @IsString({ message: 'USUARIO_PC must be a valid string', each: true })
  USUARIO_PC?: string;

  @IsOptional()
  @IsString({ message: 'INFO1 must be a valid string', each: true })
  INFO1?: string;

  @IsOptional()
  @IsString({ message: 'INFO2 must be a valid string', each: true })
  INFO2?: string;
}
