# Authentification API

## Active stack overview

- [x] [Node](https://nodejs.org/en/about) JS and TS runtime
- [x] [TypeScript](https://www.typescriptlang.org/) programming language
- [x] [NestJs](https://nestjs.com/) backend framework
- [x] [TypeORM](https://typeorm.io/) database access and migrations
- [x] [PostgreSQL](https://www.postgresql.org.pl/) database
- [ ] [Redis](https://redis.io/) cache storage
- [x] [ESLint](https://eslint.org/) linting
- [x] [Prettier](https://prettier.io/) code formatting
- [ ] [Husky](https://typicode.github.io/husky/#/) Git hooks
- [x] [Docker](https://www.docker.com/) containerization
- [ ] [Vercel](https://vercel.com/) hosting

## Prerequisites

1. Install pnpm globally (skip if you already have it installed)

   ```console
   foo@bar:~$ curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

2. Install dependencies

   ```console
   foo@bar:auth-api$ pnpm i
   ```

3. Create a `.env` file with your environment configurations using [template](/.env-example)

   ```console
   foo@bar:auth-api$ cp .env-example .env
   ```

## Run locally (development)

```console
// for developmend mode
foo@bar:auth-api$ start:dev
// ...
// for debug mode
foo@bar:auth-api$ start:debug
```

## Build and run locally (production)

```console
foo@bar:auth-api$ pnpm build
foo@bar:auth-api$ start:prod
```

## Run using Docker

1. Build Docker image

   ```console
   foo@bar:auth-api$ docker build -t <name> --target <name> .
   ```

2. Run Docker container

   ```console
   foo@bar:auth-api$ docker run --name <name> -p 80:<port> --env-file .env -d
   ```

3. Run Docker compose setup

   ```console
   // development mode
   foo@bar:auth-api$ pnpm docker:dev up
   ...
   // or
   // production mode
   foo@bar:auth-api$ pnpm docker:prod up
   ```
