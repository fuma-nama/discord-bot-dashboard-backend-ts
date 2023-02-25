declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BOT_TOKEN: string;
      BOT_CLIENT_ID: string;
      BOT_CLIENT_SECRET: string;

      /**
       * The url where the frontend is hosted
       *
       * ex: `https://my-bot.vercel.app`, default: `http://localhost:3000`
       */
      WEB_URL?: string;

      /**
       * The url where the app backend is hosted
       *
       * ex: `https://my-bot.up.railway.app`, default: `http://localhost:8080`
       */
      STATIC_URL?: string;
    }
  }
}
export {};
