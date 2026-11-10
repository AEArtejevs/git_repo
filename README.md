# Online Shop

A simple online shop backend for browsing products and making purchases.
Built with NestJS, Prisma and PostgreSQL.

## What you need

- Node.js 24 or newer
- pnpm 10 or newer
- Docker (Docker Desktop must be running)

## How to start

All commands run inside the `online-shop` folder.

```bash
cd online-shop
cp .env.example .env
docker compose up -d
pnpm install
pnpm exec prisma generate
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
pnpm start:dev
```

The API runs on http://localhost:3000

- Products: http://localhost:3000/products
- Users: http://localhost:3000/users

Example requests are in `online-shop/src/HTTP/`.

## How to check

```bash
pnpm lint
pnpm test
pnpm build
```

CI runs the same checks on every pull request to main.