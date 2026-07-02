# Green Diamond

Lab-grown diamonds & fine jewellery storefront — **Next.js 16 + TypeScript**, structured as a
pnpm workspace with a clean frontend/backend split:

```
frontend/   Next.js app (routes, components, styles)      → @green-diamond/frontend
backend/    services, repositories, domain config, types  → @green-diamond/backend
```

## Quick start

```bash
pnpm install
pnpm dev        # → http://localhost:3001
```

**Full instructions: [HOW_TO_RUN.md](./HOW_TO_RUN.md)** — prerequisites, env setup, all
commands, and troubleshooting.

## Project docs

- [`SPEC.md`](./SPEC.md) — source of truth: brand, architecture, data model, build phases
- [`AGENTS.md`](./AGENTS.md) — working rules (layering, mocked providers, money handling, a11y)
- [`docs/RUNBOOK.md`](./docs/RUNBOOK.md) — step-by-step build guide
