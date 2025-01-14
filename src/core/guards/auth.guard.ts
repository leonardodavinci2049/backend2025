import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
//import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); //
    // o objetivo é pegar o token do header da requisição
    const bearer = request.headers.authorization;
    if (!bearer) {
      throw new UnauthorizedException();
    }
    const token = bearer.split(' ')[1]; // o token é passado no header da requisição
    // console.log('ZZZZZZZZZZZ ' + request.userRequest);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // retorna o payload - foi escolhido checkToken
      // em vez de is validToken porque retorna mais dados
      const payload = this.authService.checkToken(token);
      //cria essa propriedade chamada tokenPayload  no HEAD do request e nela
      // é inserido o payload,  para ser usada em outros lugares
      request.tokenPayload = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
