import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { SelectLogDto } from './dto/SelectLogsDto';

@Injectable()
export class LogsService {
  create(createLogDto: CreateLogDto) {
    return 'This action adds a new log';
  }

  findMany(selectLogDto: SelectLogDto) {
    let connectionPool = null;
    try {
      //   const salt = await bcrypt.genSalt(10);

      const ol_id_system = loginAuthDto.ID_SYSTEM;
      const ol_id_loja = loginAuthDto.ID_LOJA ?? 1;
      const ol_id_departamento = loginAuthDto.ID_DEPARTAMENTO ?? 1;
      const ol_id_usuario = loginAuthDto.ID_USUARIO ?? 1;

      const ol_email_de_login = loginAuthDto.EMAIL_DE_LOGIN ?? '';
      const ol_login = loginAuthDto.LOGIN ?? '';
      const ol_password = getMd5(loginAuthDto.SENHA);

      const ol_id_uuid = UuidV4();
      const ol_ip = loginAuthDto.IP ?? '';

      const ol_versao = loginAuthDto.VERSAO ?? '';
      const ol_resolucao = loginAuthDto.RESOLUCAO ?? '';
      const ol_build_exe = loginAuthDto.BUILD_EXE ?? '';

      const ol_pc_name = loginAuthDto.PC_NAME ?? '';
      const ol_usuario_pc = loginAuthDto.USUARIO_PC ?? '';
      const ol_info1 = loginAuthDto.INFO1 ?? '';
      const ol_info2 = loginAuthDto.INFO2 ?? '';

      connectionPool = await this.dbService.getConnection();
      const queryString = ` call sp_usuario_Login_V1(
        '${ol_id_system}',  
        '${ol_id_loja}',
        '${ol_id_departamento}',
        '${ol_id_usuario}',
    
        '${ol_email_de_login}',
        '${ol_login}',        
        '${ol_password}',

        '${ol_id_uuid}',
        '${ol_ip}',

        '${ol_versao}',
        '${ol_resolucao}',
        '${ol_build_exe}',

        '${ol_pc_name}',
        '${ol_usuario_pc}',
        '${ol_info1}',
        '${ol_info2}'
          ) `;

      //[rows]
      const [resultData] = await connectionPool.execute(queryString);

      if (!resultData) {
        return new ResultModel(
          100404,
          'Erro: Resposta inválida do servidor',
          0,
          '',
        );
      }

      const ol_id_record = resultData[0]?.[0]?.ID_USUARIO_SYSTEM ?? 0;
      const ol_id_error = resultData[1]?.[0]?.pl_id_erro ?? 0;
      const ol_id_feedback = resultData[1]?.[0]?.pl_feedback ?? '';
      if (ol_id_error === 0 && ol_id_record > 0) {
        const token = this.createToken(ol_id_record);
        return new ResultModel(
          100200,
          `${ol_id_feedback} id: ${ol_id_record}`,
          ol_id_record,
          resultData,
          1,
          token.accessToken,
        );
      } else {
        const ol_id_feedback = resultData[0]?.[0]?.pl_feedback ?? '';
        return new ResultModel(
          100401,
          `${ol_id_feedback} id: ${ol_id_record}`,
          ol_id_record,
          resultData,
        );
      }
    } catch (err) {
      return new ResultModel(100404, err.message, 0, []);
    } finally {
      if (connectionPool) {
        connectionPool.release(); // Libera a conexão de volta ao pool
        console.log('FECHOU A CONEXÃO 1');
      }
    }

    // console.log(userLogin);
  }


  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
