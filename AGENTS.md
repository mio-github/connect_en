# Repository Guidelines
ConnectEn is a multi-tenant Next.js 14 platform tailored for dance studios. This guide distills the practices used across `connect-en-app` and supporting documentation so contributors can ship safely and quickly.

## Project Structure & Module Organization
- `connect-en-app/src/app`: App Router layouts, route groups, and tenant-aware middleware entry points.
- `connect-en-app/src/components`: Reusable UI composed with Tailwind; prefer colocating subcomponents in folders with `index.tsx`.
- `connect-en-app/src/database` and `prisma/schema.prisma`: Data access helpers and schema definitions—every query must filter by `tenantId`.
- Design and research references (`mio_desgin_system`, `now_JP_system`, `now_USA_mind_body`) inform UX decisions but should stay untouched by runtime code.

## Build, Test & Development Commands
Run everything from `connect-en-app/`:
- `npm install` — install dependencies.
- `npm run dev` — start the Vercel-style dev server at http://localhost:3000 with hot reload.
- `npm run build` — create an optimized production bundle; fails on type or lint errors.
- `npm start` — serve the production build; use for smoke tests.
- `npm run lint` — Next.js ESLint preset plus TypeScript checks.

## Coding Style & Naming Conventions
- TypeScript with strict mode and 2-space indentation; favor type-safe helpers over `any`.
- Use functional React components, server components by default, and `use client` only when interaction demands it.
- Tailwind classes follow layout→spacing→color ordering; extract complex patterns into `src/components`.
- Route, file, and schema names should remain bilingual when precedent exists (e.g., `members-会員`), matching existing hyphenation.

## Testing Guidelines
Automated tests are not configured yet; pair lint/type checks with manual verification across at least two tenants. When adding tests, prefer Playwright for App Router flows (`*.spec.ts`) and colocate under `src/app/(tests)/`. Always verify middleware-based tenant resolution and Prisma migrations locally with separate tenant seed data.

## Commit & Pull Request Guidelines
- Commits follow short imperative statements (`Update UI components`, `Reactサイドバーナビゲーションシステム実装完了`). Keep scope focused and add bilingual context only when necessary.
- PRs must describe tenant impact, affected routes, and verification steps; include screenshots or Loom links for UI work.
- Link issues or task IDs, note schema changes, and call out any required environment variable updates.

## Security & Configuration Tips
Store secrets in `.env.local`; never commit tenant credentials. API routes should keep the `/api/v1/:tenantId/...` pattern, and Prisma migrations must ensure Row Level Security parity. When working with assets, isolate uploads per tenant and avoid mixing design reference files with deployable code.
