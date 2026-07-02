# How to run Green Diamond

Green Diamond is a lab-grown diamonds & fine jewellery storefront built with **Next.js 16
(App Router) + TypeScript**, organised as a **pnpm workspace** with two packages:

| Folder      | Package                   | What lives there                                                                                                            |
| ----------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `frontend/` | `@green-diamond/frontend` | The Next.js app — routes (`app/`), UI components, styles, static assets                                                     |
| `backend/`  | `@green-diamond/backend`  | Server & domain code — payment/shipping/email services, data repositories, config (money, tax, feature flags), shared types |

The frontend imports backend code only through the `@backend/*` alias (which maps to
`backend/src/*`); the backend never imports from the frontend. Payments (Razorpay) and shipping
(Shiprocket) are **mocked behind typed interfaces** and selected by env flags, so the app runs with
zero external accounts.

> **There is no separate backend server to start.** `backend/` is a library package that executes
> *inside* the Next.js server — `pnpm dev` runs the entire stack (UI + backend services and
> repositories) as one process on port 3001. The first separate process will be the PostgreSQL
> database when Prisma lands in Phase 3.

## Prerequisites

- **Node.js 20.9+**
- **pnpm** (the repo is developed with pnpm 11) — `corepack enable` or `npm install -g pnpm`

## First run

```bash
pnpm install   # installs both workspace packages
pnpm dev       # starts the Next.js dev server (Turbopack)
```

Then open **http://localhost:3001**.

Good to know:

- The dev port is **pinned to 3001** (port 3000 is often occupied on this machine).
- Next.js allows only **one dev server per project** — a second `pnpm dev` will just exit.
- **No `.env` file is required.** Every provider (payments, shipping, data) defaults to `mock`.

## Day-to-day development

`pnpm dev` is the only command you need day to day — it runs the whole stack (frontend +
backend) with hot reload. Everything else is situational:

| Situation                              | What to run                                           |
| -------------------------------------- | ----------------------------------------------------- |
| Normal coding session                  | `pnpm dev` — edit anything, both packages hot-reload  |
| Pulled new code / package.json changed | `pnpm install` once, then `pnpm dev`                  |
| Test a production build                | `pnpm build`, then `pnpm start` (no hot reload)       |
| Phase 3+ (once Prisma/Postgres lands)  | database + `pnpm dev` — this guide will be updated    |

Keep **one** `pnpm dev` at a time — if it exits instantly, another instance already holds the
dev-server lock.

## Environment variables (optional)

Copy `frontend/.env.example` to `frontend/.env` and edit as needed. Next.js loads env files from
the `frontend/` directory, so that is where your real `.env` must live. The important switches:

```
PAYMENTS_PROVIDER="mock"   # mock | razorpay   (razorpay wired in Phase 7)
SHIPPING_PROVIDER="mock"   # mock | shiprocket (shiprocket wired in Phase 7)
DATA_SOURCE="mock"         # mock | prisma     (prisma wired in Phase 3)
```

Keep all three on `mock` until the matching real integration exists.

## All commands (run from the repo root)

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Dev server with hot reload → http://localhost:3001  |
| `pnpm build`     | Production build of the frontend (also type-checks) |
| `pnpm start`     | Serve the production build → http://localhost:3001  |
| `pnpm lint`      | ESLint over the whole workspace                     |
| `pnpm typecheck` | `tsc --noEmit` in every workspace package           |

To target one package directly, use a pnpm filter, e.g.:

```bash
pnpm --filter @green-diamond/backend typecheck
pnpm --filter @green-diamond/frontend build
```

Database scripts (`db:migrate`, `db:seed`, `db:studio`) arrive with Prisma in Phase 3.

## Before committing

Per [`AGENTS.md`](./AGENTS.md), make sure these all pass:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

## Troubleshooting

- **Port already in use** — another instance is running, or something else took 3001. Stop it, or
  change the `-p 3001` in `frontend/package.json` (`scripts.dev` / `scripts.start`).
- **Stale build weirdness** — delete `frontend/.next` and rerun `pnpm dev`.
- **Module resolution errors after pulling** — reinstall:
  `rm -rf node_modules frontend/node_modules backend/node_modules && pnpm install`.

## Feature log (FEATURES.md)

[`FEATURES.md`](./FEATURES.md) is a running record of every feature, maintained **automatically
on every commit** by a git hook (`scripts/git-hooks/post-commit` → `scripts/update-features.mjs`):

- A commit whose subject starts with `feat:` / `feat(scope):` **adds an entry** — title from the
  commit subject, description from the commit body. Write a good commit message and the log
  writes itself.
- Any later commit that touches a feature's files **bumps its "Last updated"** (file renames are
  tracked too).
- Deleting **all** of a feature's files marks its entry **removed** (struck through). Entries for
  other features are never touched.
- The hook folds the log update **into the same commit** (one automatic amend), so the log always
  matches history — commit normally and forget it's there.
- The description text under each `<!-- description -->` marker is yours: hand-edits are
  preserved across updates.

Setup is automatic — `pnpm install` activates the hook (via the root `prepare` script). Manual
controls: `node scripts/setup-hooks.mjs` re-activates it; `pnpm features:backfill` rebuilds the
whole file from git history (this overwrites manual description edits).

The same hook also regenerates [`STRUCTURE.md`](./STRUCTURE.md) — a snapshot of the file tree,
kept current on every commit. The **placement rules** themselves (where new files go, naming,
frontend/backend import boundaries) live in [`AGENTS.md`](./AGENTS.md) under "File organization
rules" and are enforced by `pnpm lint`, so they apply in every session, profile, or AI tool.

## More docs

- [`SPEC.md`](./SPEC.md) — the project contract (architecture, phases, acceptance criteria)
- [`AGENTS.md`](./AGENTS.md) — rules for working on this codebase
- [`docs/RUNBOOK.md`](./docs/RUNBOOK.md) — the step-by-step build guide
