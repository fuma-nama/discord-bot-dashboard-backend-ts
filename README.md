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

## Notice

If you are going to use http-only cookies, you should use the same domain for both sides

Although It might be a bad idea, just use local storage or cookies if it's too annoying for you <br/>
