import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { v4 as UuidV4 } from 'uuid';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { getMd5 } from 'src/core/utls/generators/get_md5';
import { ResultModel } from 'src/core/utls/result.model';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  private issuer = 'webservice';
  private audience = 'user';

  private connection: Connection;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly dbService: DatabaseService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const userRegister = await this.userService.create(registerAuthDto);
    return userRegister;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
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

  async forget(email: string) {
    throw new BadRequestException('Método não implementado');
  }

  async reset(password: string, token: string) {
    throw new BadRequestException('Método não implementado');
  }

  createToken(id: number) {
    return {
      accessToken: this.jwtService.sign(
        {
          //Payload
          id: id,
        },
        {
          //options
          expiresIn: '7 days',
          subject: id.toString(),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  isValidToken(token: string) {
    // rota que válida o token
    try {
      this.checkToken(token);
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    return true;
  }

  checkToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        issuer: this.issuer, //verifica se o token foi emitido pelo servidor
        audience: this.audience, // verifica se o token é para o usuário
      });

      return payload;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async validateUser(payload: any) {
    throw new BadRequestException('Método não implementado');
  }
}
