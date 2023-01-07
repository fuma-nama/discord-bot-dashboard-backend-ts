import { HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { AccessToken } from 'src/services/app.service';

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
