import { AppService, CLIENT_ID, REDIRECT_URI } from '@services/app.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { auth, TokenCookie } from '@middlewares/auth.middleware';

@Controller()
export class AuthController {
  constructor(private readonly discord: AppService) {}

  @Get('/login')
  @Redirect(
    'https://discord.com/api/oauth2/authorize?' +
      new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'identify guilds',
      }),
    302,
  )
  loginDiscord() {
    // redirect
  }

  @Get('/callback')
  async onLogin(@Query() query: { code?: string }, @Res() res: Response) {
    if (query.code == null) {
      throw new HttpException('Missing query param', HttpStatus.BAD_REQUEST);
    }

    const token = await this.discord.exchangeToken(query.code);

    res.cookie(TokenCookie, JSON.stringify(token), {
      httpOnly: true,
      maxAge: token.expires_in,
    });

    res.redirect('http://localhost:3000/callback');
  }

  @Get('/auth')
  async signin(@Req() req: Request, @Res() res: Response) {
    const user = auth(req);
    const refresh = await this.discord.refreshToken(user.refresh_token);

    res.cookie(TokenCookie, JSON.stringify(refresh), {
      httpOnly: true,
      maxAge: refresh.expires_in,
    });

    res.status(HttpStatus.OK).json(refresh.access_token);
  }

  @Post('/auth/signout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const user = auth(req);

    res.clearCookie(TokenCookie);
    await this.discord.revokeToken(user.access_token);
    res.sendStatus(HttpStatus.OK);
  }
}
