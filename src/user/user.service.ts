import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as UuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { envs } from 'src/core/config';
import { createConnection, Connection } from 'mysql2/promise';
import { DatabaseService } from 'src/database/database.service';
import { getMd5 } from 'src/core/utls/generators/get_md5';

import { ResultModel } from 'src/core/utls/result.model';
import { IUserId } from './entities/userId.entity';

@Injectable()
export class UserService {
  private connection: Connection;
  constructor(private readonly dbService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    let connectionPool = null;
    try {
      //   const salt = await bcrypt.genSalt(10);

      const ol_id_system = createUserDto.ID_SYSTEM;
      const ol_id_loja = createUserDto.ID_LOJA;
      const ol_id_departamento = createUserDto.ID_DEPARTAMENTO;
      const ol_id_usuario = createUserDto.ID_USUARIO;

      const ol_id_uuid = UuidV4();
      const ol_id_pessoa = createUserDto.ID_PESSOA;

      const ol_nome = createUserDto.NOME;
      const ol_email_de_login = createUserDto.EMAIL_DE_LOGIN;
      const ol_login = createUserDto.LOGIN;
      const ol_password = getMd5(createUserDto.SENHA);

      connectionPool = await this.dbService.getConnection();
      console.log('ABRIU CONEXÃO 1');
      //[rows]

      const queryString = `call sp_usuario_create_V1(
                      ${ol_id_system},
                      ${ol_id_loja},
                      ${ol_id_departamento},        
                      ${ol_id_usuario},

                      '${ol_id_uuid}', 
                      ${ol_id_pessoa},

                      '${ol_nome}',
                       '${ol_email_de_login}',
                       '${ol_login}',
                       '${ol_password}'
                     ); `;
      const [newUser] = await connectionPool.execute(queryString);
      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      const ol_id_record = newUser[0][0].ID_USUARIO_SYSTEM;
      const ol_id_error = newUser[1][0].pl_id_erro;
      const ol_id_feedback = newUser[1][0].pl_feedback;
      if (ol_id_error === 0 && ol_id_record > 0) {
        return new ResultModel(
          100200,
          `${ol_id_feedback} id: ${ol_id_record}`,
          ol_id_record,
          newUser,
        );
      } else {
        return new ResultModel(100404, ol_id_feedback, 0, '');
      }
    } catch (err) {
      return new ResultModel(100404, err.message, 0, '');
    } finally {
      if (connectionPool) {
        connectionPool.release();
        console.log('FECHOU A CONEXÃO 1');
      }
    }

    // console.log(userLogin);
  }

  // USANDO PRISMA
  async findAll() {
    let connectionPool = null;

    try {
      connectionPool = await this.dbService.getConnection();
      // console.log('ABRIU CONEXÃO 1');
      //[rows]

      const [ResultLogin] = await connectionPool.execute(`
                                            select 
                                              ID_USUARIO_SYSTEM,
                                              ID_SYSTEM_CFG_CLIENTE,
                                              ID_PESSOA,
                                              LOGIN,
                                              NOME,
                                              EMAIL_DE_LOGIN,
                                              SENHA
                                            from 
                                              tbl_system_usuario
                                            where
                                             ID_SYSTEM_CFG_CLIENTE = 14
                                            order by ID_USUARIO_SYSTEM desc limit 2
                                            `);

      return new ResultModel(
        100200,
        'Usuário(s) carregados com sucesso',
        0,
        ResultLogin,
      );
    } catch (err) {
      return new ResultModel(100404, err, 0, '');
    } finally {
      if (connectionPool) {
        connectionPool.release();
        // console.log('FECHOU A CONEXÃO 1');
      }
    }
  }

  // USANDO MYSQL2 COM MODULO
  async findAll1() {
    let connectionPool = null;

    try {
      connectionPool = await this.dbService.getConnection();
      //[rows]
      const [rows] = await connectionPool.query(`
                                            select 
                                              ID_USUARIO_SYSTEM,
                                              ID_SYSTEM_CFG_CLIENTE,
                                              ID_PESSOA,
                                              LOGIN,
                                              NOME,
                                              EMAIL_DE_LOGIN,
                                              SENHA
                                            from 
                                              tbl_system_usuario
                                            where
                                             ID_SYSTEM_CFG_CLIENTE = 14
                                            order by ID_USUARIO_SYSTEM desc limit 5
                                            `);

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      if (connectionPool) {
        connectionPool.release();
        // console.log('FECHOU A CONEXÃO 1');
      }
    }
  }
  // USANDO MYSQL2 SEN MODULO
  async findAll2() {
    //   console.log('connection: aqui 1 ');

    //  const connection = this.dbService.getConnection();

    this.connection = await createConnection({
      port: 3306,
      host: envs.DB_MYSQL_HOST,
      user: envs.DB_MYSQL_USER,
      password: envs.DB_MYSQL_PASSWORD,
      database: envs.DB_MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      pool: true,
    });

    try {
      console.log('ABRIU CONEXÃO 2');
      //[rows]
      const [rows] = await this.connection.query(`
                                            select 
                                              ID_USUARIO_SYSTEM,
                                              ID_SYSTEM_CFG_CLIENTE,
                                              ID_PESSOA,
                                              LOGIN,
                                              NOME,
                                              EMAIL_DE_LOGIN,
                                              SENHA
                                            from 
                                              tbl_system_usuario
                                            where
                                             ID_SYSTEM_CFG_CLIENTE = 14
                                            order by ID_USUARIO_SYSTEM desc limit 100
                                            `);

      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('FECHOU A CONEXÃO 2');
      this.connection.end();
    }
  }

  async findOne(id: number) {
    let connectionPool = null;

    if (!id) throw new NotFoundException(`User with id not found`);
    // console.log('id: ' + id);
    await this.userExists(id);

    try {
      connectionPool = await this.dbService.getConnection();
      // console.log('ABRIU CONEXÃO 1');
      //[rows]

      const [resultUser] = await connectionPool.execute(`
                                            select 
                                              ID_USUARIO_SYSTEM,
                                              ID_SYSTEM_CFG_CLIENTE,
                                              ID_PESSOA,
                                              LOGIN,
                                              NOME,
                                              EMAIL_DE_LOGIN,
                                              SENHA
                                            from 
                                              tbl_system_usuario
                                            where
                                             ID_SYSTEM_CFG_CLIENTE = 14
                                            and ID_USUARIO_SYSTEM = ${id}
                                            order by ID_USUARIO_SYSTEM desc limit 2
                                            `);

      return new ResultModel(
        100200,
        `Usuário id: ${id} carregados com sucesso`,
        0,
        resultUser,
      );
    } catch (err) {
      return new ResultModel(100404, err, 0, '');
    } finally {
      if (connectionPool) {
        connectionPool.release();
        // console.log('FECHOU A CONEXÃO 1');
      }
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      if (!id) throw new NotFoundException(`User with id not found`);
      // console.log('id: ' + id);
      const result = await this.userExists(id);

      if (result.data === 0) {
        return new ResultModel(
          100404,
          `Usuário id: ${id} não foi encontrado`,
          0,
          '',
        );
      }

      const queryString = `UPDATE tbl_system_usuario SET ? WHERE ID_USUARIo_SYSTEM = ?;`;
      const updateDate = await this.dbService.ModifyQuery(queryString, [
        data,
        id,
      ]);
      if (updateDate) {
        return new ResultModel(
          100200,
          `Usuário id: ${id} atualizado com sucesso`,
          0,
          updateDate,
        );
      }
    } catch (err) {
      return new ResultModel(100404, err, 0, '');
    } finally {
      // console.log('FECHOU A CONEXÃO 1');
    }
  }

  async remove(id: number) {
    try {
      if (!id) throw new NotFoundException(`User with id not found`);
      // console.log('id: ' + id);
      const result = await this.userExists(id);

      if (result.data === 0) {
        return new ResultModel(
          100404,
          `Usuário id: ${id} não foi encontrado`,
          0,
          0,
        );
      }

      const queryString = `DELETE FROM tbl_system_usuario WHERE ID_USUARIO_SYSTEM = ?;`;
      const deteteDate = await this.dbService.ModifyExecute(queryString, [id]);
      if (deteteDate) {
        return new ResultModel(
          100200,
          `Usuário id: ${id} excluído com sucesso`,
          0,
          deteteDate,
        );
      }
    } catch (err) {
      return new ResultModel(100404, err, 0, '');
    } finally {
      // console.log('FECHOU A CONEXÃO 1');
    }
  }

  async userExists(id: number) {
    try {
      const queryString = `SELECT                            
                            ID_USUARIO_SYSTEM  
                        FROM 
                          tbl_system_usuario 
                        WHERE 
                          ID_USUARIO_SYSTEM = ?;`;

      const [resultUserId] = await this.dbService.selectExecute<IUserId>(
        queryString,
        [id],
      );

      let id_usuario = 0;
      if (resultUserId) {
        id_usuario = resultUserId.ID_USUARIO_SYSTEM;

        return new ResultModel(
          100200,
          `Usuário id: ${id} carregados com sucesso`,
          0,
          id_usuario,
        );
      } else {
        return new ResultModel(100404, 'Usuário não encontrado', 0, 0);
      }
    } catch (err) {
      return new ResultModel(100404, err.message, 0, 0);
    } finally {
      //if (connectionPool) {
      // connectionPool.release();
      console.log('FECHOU A CONEXÃO 1');
    }
  }

  async pause(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
    // await this.pause(5000);
  }
}
