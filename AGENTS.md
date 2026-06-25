# Green Diamond — Agent Guide

**Source of truth:** Follow [`SPEC.md`](./SPEC.md) (the master build prompt) as the contract for
this project. The step-by-step build guide is [`docs/RUNBOOK.md`](./docs/RUNBOOK.md).

## Core rules (do not violate)

- Build **strictly phase by phase** as defined in SPEC.md §13 "Build Order". Do not jump ahead.
- UI and route handlers talk **only to the service / repository interfaces** in `lib/services` and
  `lib/repositories`. **Never** call a vendor SDK (Razorpay, Shiprocket) or mock data directly from
  the UI.
- Razorpay (payments) and Shiprocket (shipping) stay **mocked behind typed interfaces**, selected by
  feature flags (`PAYMENTS_PROVIDER`, `SHIPPING_PROVIDER`, `DATA_SOURCE`). Mark deferred work with
  `// TODO(razorpay):` / `// TODO(shiprocket):` and keep it centralised in `lib/services/`.
- Currency is **INR**; all money is **paise-safe** (integer minor units). GST is a **configurable**
  tax rule — never hardcode the rate as if it were settled law.
- Validate **all** inputs with **Zod** (schemas shared client + server). Use a consistent error shape.
- Accessibility is non-negotiable: WCAG **AA** contrast, semantic HTML, full keyboard nav, visible
  focus states, alt text everywhere, ARIA on interactive components, respect `prefers-reduced-motion`.
- Keep all sustainability/ethics claims accurate and certification-backed — **no greenwashing** (see
  SPEC.md §2). The carbon advantage is conditional on the energy source; message with integrity.

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler) + **TypeScript**, Node 20.9+, **pnpm**.
- **Tailwind CSS v4** — design tokens defined CSS-first via the `@theme` directive in
  `app/globals.css` (no `tailwind.config` file).
- **Zustand** (cart/UI state), **Prisma + PostgreSQL**, **Auth.js**, **Zod**.

## Layered architecture (SPEC.md §5)

```
app/          routes (storefront + admin + api route handlers)
components/    presentational UI
features/      domain modules (cart, catalog, checkout, account, admin)
lib/
  services/    INTERFACES + implementations (payment, shipping, email, search)
  repositories/ data access (mock now → Prisma later, same interface)
  db/          prisma client, schema, seed
  validation/  zod schemas
  utils/
config/        env loading, feature flags, money/currency, tax rules
types/         shared types
styles/        tokens, globals
tests/         unit + e2e
```

## Commands

- `pnpm dev` — run locally (Turbopack) → http://localhost:3000
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint
- DB scripts (`db:migrate`, `db:seed`, `db:studio`) are added in Phase 3.

## Conventions

- Conventional commits, one phase/batch per commit (`feat(ui): product detail page`, `chore: ...`).
- After changing code, make sure `pnpm lint` and `pnpm build` pass before committing.
