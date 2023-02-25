export const API_ENDPOINT = 'https://discord.com/api/v10';
export const CLIENT_ID = process.env.BOT_CLIENT_ID;
export const CLIENT_SECRET = process.env.BOT_CLIENT_SECRET;
const STATIC_URL = process.env.STATIC_URL ?? 'http://localhost:8080';
export const REDIRECT_URI = `${STATIC_URL}/callback`;
export const WEB_URL = process.env.WEB_URL ?? 'http://localhost:3000';
