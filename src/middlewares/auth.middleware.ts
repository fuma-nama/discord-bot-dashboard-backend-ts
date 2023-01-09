import { HttpStatus, HttpException } from '@nestjs/common';
import { AccessToken } from '@services/discord.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export const TokenCookie = 'ts-token';

export function auth(req: Request) {
  const data = req.cookies[TokenCookie] as string | null;
  const token: AccessToken | null =
    data == null ? null : (JSON.parse(data) as AccessToken);

  if (token == null || token.access_token == null) {
    throw new HttpException('You must login first', HttpStatus.UNAUTHORIZED);
  }

  return token;
}

export interface AuthRequest extends Request {
  user: AccessToken;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    req.user = auth(req);

    next();
  }
}
