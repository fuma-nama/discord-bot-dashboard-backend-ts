declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BOT_TOKEN: string;
      BOT_CLIENT_ID: string;
      BOT_CLIENT_SECRET: string;
    }
  }
}
export {};
