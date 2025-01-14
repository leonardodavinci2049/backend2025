import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const UserIdDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    console.log('tokenPayload: ' + { userID: request.tokenPayload });

    if (request.tokenPayload.id) {
      const userId = parseInt(request.tokenPayload.id); //

      return { id: userId };
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.',
      );
    }
  },
);
