import { RowDataPacket } from 'mysql2';

export interface IUserId extends RowDataPacket {
  ID_USUARIO_SYSTEM: number;
}
