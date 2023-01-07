import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export const API_ENDPOINT = 'https://discord.com/api/v10';
export const CLIENT_ID = process.env.BOT_CLIENT_ID;
export const CLIENT_SECRET = process.env.BOT_CLIENT_SECRET;
export const REDIRECT_URI = 'http://localhost:8080/callback';

export type AccessToken = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async exchangeToken(code: string): Promise<AccessToken> {
    const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
      headers,
      method: 'POST',
      body: new URLSearchParams(data),
    });

    if (response.ok) {
      return (await response.json()) as AccessToken;
    } else {
      throw new HttpException('Failed to exchange token', HttpStatus.FORBIDDEN);
    }
  }

  async refreshToken(refreshToken: string): Promise<AccessToken> {
    const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
      headers,
      method: 'POST',
      body: new URLSearchParams(data),
    });

    if (response.ok) {
      return (await response.json()) as AccessToken;
    } else {
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async revokeToken(accessToken: string) {
    const data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      token: accessToken,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const res = await fetch(`https://discord.com/api/oauth2/token/revoke`, {
      headers,
      body: new URLSearchParams(data),
      method: 'POST',
    });

    if (res.ok) {
      return (await res.json()) as AccessToken;
    } else {
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
