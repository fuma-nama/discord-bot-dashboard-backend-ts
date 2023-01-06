import { PrismaService } from './../prisma.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/login')
  @Redirect(
    'https://discord.com/api/oauth2/authorize?' +
      new URLSearchParams({
        client_id: '1056177022562476072',
        redirect_uri: 'http://localhost:8080/callback',
        response_type: 'code',
        scope: 'identify guilds',
      }),
    302,
  )
  loginDiscord() {
    // redirect
  }

  @Get('/callback')
  onLogin(@Query() query: { code?: string }, @Res() res: Response) {
    if (query.code == null) {
      throw new HttpException('Missing query param', HttpStatus.BAD_REQUEST);
    }

    res.redirect('http://localhost:3000/callback');
  }

  @Get('/auth')
  signin() {
    return 'null';
  }
}
