> **Frontend Repo** <br/> > https://github.com/SonMooSans/discord-bot-dashboard-2

# Discord Bot Dashboard Backend Demo

## Tech Stack

- Database (Prisma)
- Nest.js with Typescript
- Discord.js

## Configuration

You need some **Environment variables** in order to run it

### Database url

It is used for Prisma, I am using PostgreSQL but you may use any supported databases as well

Read [here](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres) for further details

`DATABASE_URL="postgresql://postgres:password@localhost:5432/my-db?schema=public"`

### Oauth2

Setup an oauth2 application in Discord Developer Portal

```
BOT_CLIENT_ID="CLIENT_ID"
BOT_CLIENT_SECRET="CLIENT_SECRET"
```

### Discord Bot Token

The bot token is also required

`BOT_TOKEN="YOUR_TOKEN"`

### Web URL & Static URL

In order to redirect you back to sign in page, we need urls for your web frontend & backend

Also, `WEB_URL` is the default origin of the CORS configuration

```
STATIC_URL="https://my-bot-api.up.railway.app"
WEB_URL="https://my-bot.vercel.app"
```

If those variables don't exist, we will use `localhost:3000` and `localhost:8080` for frontend and backend

# Important

If you planned to deploy the app, You must pay attention to **CORS** <br/>
We will save your access token in a **http-only cookie**

Change the cookie settings [here](.\src\controllers\auth.controller.ts)

## Same Domain

You have your own domain or hosted via some platforms

Example: **app.money.com** and **api.money.com** for frontend and backend <br/>
Then you don't have to change anything, It should be worked as expected

## Different Domain

You don't have a same domain for both frontend and backend

Example: **money.vercel.app** and **money.railway.app** <br/>
I had face some weird issues on IOS devices, I need to fix it by

- Redirect to client side with token provided (`http://localhost:3000/callback#token=xxx`)
- Read the token and use it in future api requests on Client side
  (Pass it via Authorization header)
- To get the refresh token, we use jwt token instead of the access token from discord

## Notice

If you are going to use http-only cookies, you should use the same domain for both sides

Although It might be a bad idea, just use local storage or cookies if it's too annoying for you <br/>

# Deploy

We recommend using https://railway.app to deploy your backend

You are able to host both your database and node.js server on Railway

## PORT

The service will be running in port `8080`

If you planned to deploy the app on railway, please add an enironment variable:
| name | value |
| --- | --- |
| PORT | 8080 |

So that the service can be detected by railway (see [here](https://docs.railway.app/deploy/railway-up) for further information)
