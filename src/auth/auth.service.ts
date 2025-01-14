import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

    //  return this.createToken(userRegister);
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const password = getMd5(loginAuthDto.SENHA);
    const userLogin = false;
    //console.log(loginAuthDto.LOGIN, loginAuthDto.SENHA);
    /*     const userLogin = await this.prisma.tbl_system_usuario.findFirst({
      where: {
        LOGIN: loginAuthDto.LOGIN,
        SENHA: password,
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_UUID: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        ID_PESSOA: true,
        LOGIN: true,
        NOME: true,
        ROLE: true,
        EMAIL_DE_LOGIN: true,
        SENHA: true,
      },
    }); */

    if (!userLogin) {
      throw new UnauthorizedException(
        new ResultModel(
          100401,
          'Login e/ou Senha Incorretos.',
          'Unauthorized',
          {},
        ),
      );
    }

    // console.log(userLogin);

    return new ResultModel(100200, 'Login Efetuado com sucesso', '', {
      token: this.createToken(userLogin),
      user: userLogin,
    });
  }

  async logLogin(loginAuthDto: LoginAuthDto) {
    const login = loginAuthDto.LOGIN;
    const password = getMd5(loginAuthDto.SENHA);
    let connectionPool;
    try {
      connectionPool = await this.dbService.getConnection();
      console.log('ABRIU CONEXÃO 1');
      //[rows]
      const [rows] = await connectionPool.execute(`
                                           
                                          call exec_UsuarioLoginV1(
                                                        14,
                                                        1,    
                                                        1,          
                                                        1,   

                                                        '${login}',    
                                                        '${password}', 
                                                        1, 	
                                                        '19372846',   
                                                        '19372846',  
                                                                      
                                                        '19372846',            
                                                        '19372846', 
                                                        '19372846',      
                                                        '19372846',  
                                                                      
                                                        '19372846',    
                                                        '19372846'    
                                                      )


                                            `);

      // console.log(rows); // results contains rows returned by server
      // console.log(fields); // fields cont

      return new ResultModel(100200, 'Login Efetuado com sucesso', '', {
        token: '193272846',
        user: rows,
      });
    } catch (err) {
      console.log(err);
    } finally {
      if (connectionPool) {
        connectionPool.release(); // Libera a conexão de volta ao pool
        console.log('FECHOU A CONEXÃO 1');
      }
    }

    // console.log(userLogin);
  }

  async forget(email: string) {
    /*     const user = await this.prisma.tbl_system_usuario.findFirst({
      where: {
        EMAIL_DE_LOGIN: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    } */

    /*   
    const token = this.jwtService.sign({
      id: user.ID_SYSTEM_CFG_CLIENTE
  }, {
      expiresIn: "30 minutes",
      subject: String(user.ID_SYSTEM_CFG_CLIENTE),
      issuer: 'forget',
      audience: 'users',
  }); */
    /* 
  await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: 'joao@hcode.com.br',
      template: 'forget',
      context: {
          name: user.name,
          token
      }
  }); */

    return true;
  }

  async reset(password: string, token: string) {
    // To do: implementar a verificação do token
    /*     try {
      const data: any = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      const userPasswordReset = await this.prisma.tbl_system_usuario.update({
        where: {
          ID_USUARIO_SYSTEM: Number(data.id),
        },
        data: {
          SENHA: password,
        },
      });
      return this.createToken(userPasswordReset);
    } catch (e) {
      throw new BadRequestException(e);
    } */
  }

  createToken(user: RegisterAuthDto) {
    return {
      accessToken: this.jwtService.sign(
        {
          //Payload
          id: user.ID_USUARIO_SYSTEM,
        },
        {
          //options
          expiresIn: '7 days',
          subject: user.ID_USUARIO_SYSTEM.toString(),
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
    /*     return await this.prisma.tbl_system_usuario.findFirst({
      where: {
        ID_USUARIO_SYSTEM: payload.id,
      },
    }); */

    return false;
  }
}
