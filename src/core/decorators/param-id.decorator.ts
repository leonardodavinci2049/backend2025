import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return Number(request.params.id);
  },
);
