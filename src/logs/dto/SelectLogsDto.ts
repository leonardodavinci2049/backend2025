import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class SelectLogDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID_UUID must be a valid UUIDv4' })
  ID_UUID;

  @IsInt()
  ID_SYSTEM?: number;

  @IsOptional()
  @IsInt()
  ID_LOJA?: number;

  @IsOptional()
  @IsInt()
  ID_DEPARTAMENTO?: number;

  @IsOptional()
  @IsInt()
  ID_USUARIO?: number;
}
