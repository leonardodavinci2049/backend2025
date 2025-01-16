import { RowDataPacket } from 'mysql2';

export interface IUserRow extends RowDataPacket {
  ID_USUARIO_SYSTEM: number;
  ID_UUID: string;
  ID_PESSOA: number;
  LOGIN: string;
  NOME: string;
  EMAIL_DE_LOGIN: string;
  SENHA: string;
  DATADOCADASTRO: Date;
  DT_UPDATE: Date;
}
