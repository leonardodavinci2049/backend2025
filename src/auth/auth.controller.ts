import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserIdDecorator } from 'src/core/decorators/userid.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('v1/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('v1/signIn')
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    // console.log(loginAuthDto.EMAIL_DE_LOGIN, loginAuthDto.SENHA);
    return this.authService.signIn(loginAuthDto);
  }

  @Post('v1/forgetPassword')
  forget(@Body() ForgetAuthDto: ForgetAuthDto) {
    return this.authService.forget(ForgetAuthDto.EMAIL_DE_LOGIN);
  }

  @Post('v1/resetPassword')
  reset(@Body() ResetAuthDto: ResetAuthDto) {
    return this.authService.reset(ResetAuthDto.token, ResetAuthDto.SENHA);
  }

  @UseGuards(AuthGuard)
  @Post('v1/me')
  me(@UserIdDecorator() user) {
    //console.log('headers: ', user.id);
    try {
      return this.authService.validateUser(user);
    } catch (e) {
      return e;
    }
  }

  @Post('v1/checkToken')
  async checkToken(@Req() Req, @Headers('authorization') headers) {
    console.log('Req.tokenPayload: ', Req.tokenPayload);
    //  Req.tokenPayload essa propriedade foi criada no jwt.auth.guard.ts
    //  O decorator @User foi criado manualmente]
    // Não precisa retornar os dados do usuário em uma verificação de token
    // O guard JwtAuthGuard é interessante porque posso colocar nos controles ou diretamente nas rotas

    const token = headers.authorization.split(' ')[1];
    return this.authService.checkToken(token);
    // return {message: 'Token Success', data: Req.tokenPayload, user: Req.user};
  }
}
