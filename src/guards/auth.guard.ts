import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.headers.authorization) {
        throw new UnauthorizedException();
      }
      const token = request.headers.authorization;
      const data = verifyToken(token, process.env.JWT_SECRET);
      request.userData = data;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
