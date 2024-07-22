import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const jwtAuthGuard = await super.canActivate(context);

    if (!jwtAuthGuard) {
      return false;
    }

    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const type = user?.type || [];

    return this.matchRoles(roles, type);
  }

  private matchRoles(roles: string[], type: string[]) {
    return roles.some((role) => type.some((type) => role === type));
  }
}
