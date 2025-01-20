import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RoleEnum } from 'src/core/enums/role.enum';

//import { Role } from 'src/core/enums/role.enum';

export class CreateUserDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID_UUID must be a valid UUIDv4' })
  ID_UUID;

  @IsOptional()
  @IsInt()
  ID_SYSTEM?: number;

  @IsInt()
  ID_LOJA?: number;

  @IsOptional()
  @IsInt()
  ID_DEPARTAMENTO?: number;

  @IsInt()
  ID_USUARIO?: number;

  @IsInt()
  ID_PESSOA?: number;

  @IsString({ message: 'NOME must be a valid string', each: true })
  NOME?: string;

  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;

  @IsString({ message: 'LOGIN must be a valid string', each: true })
  LOGIN?: string;

  @IsString({ message: 'LOGIN must be a valid string', each: true })
  SENHA?: string;

  @IsOptional()
  @IsEnum(RoleEnum, { message: 'ROLE must be a valid Role' })
  ROLE?: number;
}
