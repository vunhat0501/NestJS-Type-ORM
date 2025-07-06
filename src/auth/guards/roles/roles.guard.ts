import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //** 1. Extract the role metadata from the handler and the class
    // * 2. getAllAndOverride function first look for the metadata under the ROLE_KEY inside the entire class
    // * and if any handler has it own metadata on the ROLE_KEY => override that metadata */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const user = context.switchToHttp().getRequest().user;
    //** If role of the user match any role inside of the requiredRoles list, return true */
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);
    return hasRequiredRole;
  }
}
