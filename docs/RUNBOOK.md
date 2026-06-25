# Green Diamond — Build Runbook

A clean, professional walkthrough for turning the master prompt (`green-diamond-build-prompt.md`) into a live site — in the order you should actually do it: **set up → create the repo → visualise the frontend → build the backend → harden → deploy → (later) wire payments & shipping.**

> **The one rule that makes this work:** treat the master prompt as your **single source of truth (a spec file in the repo)**, and drive your coding agent **one phase at a time**. Pasting the whole spec and asking for "everything" at once produces worse results than asking for Phase 0, reviewing, committing, then Phase 1, and so on.

---

## The mental model (why it's built in this order)

```
            ┌─────────────────────────────────────────┐
   YOU  →   │  SPEC.md  (the master prompt = contract) │
            └─────────────────────────────────────────┘
                              │ drive phase by phase
                              ▼
   FRONTEND (pages/components)
        │  talks only to
        ▼
   SERVICE & REPOSITORY INTERFACES   ← the swappable seam
        │                         │
        ▼  (now)                  ▼  (later)
   MOCK data + MOCK payment/   →   POSTGRES + RAZORPAY + SHIPROCKET
   shipping providers              (fill skeletons, flip a flag)
```

You build the **frontend against mocks first** so you can *see and refine the whole site* before any database or vendor exists. Then you slide the real backend in behind the same interfaces — the UI never has to change.

---

## Part 0 — Set up your machine (once)

Install these:

1. **Node.js 20.9+ (LTS)** — ideally via a version manager (`nvm`). Check: `node --version`.
2. **Git** + a **GitHub** account. Check: `git --version`.
3. **pnpm** (fast package manager): `npm install -g pnpm`.
4. **VS Code** (or your editor).
5. **Claude Code** — terminal or the VS Code extension. This is what will actually write the code from your spec.

Accounts you'll create **later, only when each phase needs them** (all have free tiers):
- **Phase 3 (database):** Neon *or* Supabase (managed Postgres).
- **Phase 6 (media/analytics):** Cloudinary; GA4 or Plausible.
- **Phase 7 (deferred):** **Razorpay** and **Shiprocket** — *not needed until the very end.*

---

## Part 1 — Create the repository & scaffold the project

**1.1 — Scaffold the app** (this also sets up TypeScript, Tailwind v4, ESLint, App Router, Turbopack, the `@/*` import alias, and an `AGENTS.md`/`CLAUDE.md` for the agent):

```bash
pnpm create next-app@latest green-diamond --yes
cd green-diamond
pnpm dev          # open http://localhost:3000 to confirm it runs
```

**1.2 — Put it on GitHub.** Create an empty repo named `green-diamond` on GitHub (no README), then:

```bash
git add -A && git commit -m "chore: scaffold Next.js app"
git branch -M main
git remote add origin https://github.com/<you>/green-diamond.git
git push -u origin main
```

**1.3 — Add the spec to the repo.** Save the master prompt as **`SPEC.md`** in the project root (or `docs/PRD.md`). Then open `CLAUDE.md` and add one line so the agent always anchors to it:

> `Follow /SPEC.md as the source of truth for this project. Build strictly phase by phase as defined in its "Build Order" section. Use the swappable service/repository interfaces; never call vendor SDKs or mock data directly from UI.`

Commit: `git commit -am "docs: add SPEC.md and point agent at it"`.

**1.4 — Open the project in Claude Code** (it reads the repo, including `SPEC.md` and `CLAUDE.md`).

---

## Part 2 — Lay the foundation (Phase 0)

Give the agent a tightly scoped instruction — **foundation only, no pages yet**:

> *"Read SPEC.md. Execute **Phase 0** only: design tokens in Tailwind v4 `@theme`, the base component library, the root layout + header + footer shells, environment + feature-flag scaffolding (`.env.example`, config), and the **mock data + service/repository interfaces** (catalog, cart, payment, shipping, email). Do not build pages yet. Then summarise the folder structure."*

Then:
- Review the structure and tokens. Adjust the palette/typography if you want a different feel.
- `git checkout -b phase-0-foundation`, commit, open a PR (or just commit to `main` if solo).

---

## Part 3 — Visualise the frontend (Phase 1) ← the fun part

This is where you **see the whole site** running on mock data and refine the look before touching a database. Keep `pnpm dev` running the entire time and review each section in the browser.

Drive it in **small batches** rather than "build all pages." A good order:

| Batch | Ask the agent to build (against mocks) |
|------|------------------------------------------|
| 3.1 | Home page + header/mega-menu + footer + announcement bar |
| 3.2 | Shop listing (faceted filters + sort) + product card + quick-view |
| 3.3 | Product detail page (gallery, variant selectors, specs, cert, reviews) |
| 3.4 | Loose-diamond 4C finder |
| 3.5 | Cart (drawer + page) + the full multi-step checkout **UI** (still mock) |
| 3.6 | Content pages: About, How Lab Diamonds Are Made, Sustainability/Ethics, Education/4Cs, Certification, Contact, FAQ |
| 3.7 | **Journal/Blog: index + category/tag archives + single-post pages** (seeded articles) |
| 3.8 | Account + Auth screens (UI only at this stage) |
| 3.9 | 404 / 500 / empty / loading states + responsive + accessibility pass |

For each batch:
1. Ask for **that batch only**, referencing `SPEC.md`.
2. **Look at it in the browser.** Give concrete feedback ("hero too short", "tighten card spacing", "make the gold accent subtler").
3. Commit when happy (`git commit -m "feat(ui): product detail page"`).

> **Pro move:** import the repo to **Vercel** now (Part 6) to get an automatic **preview URL per push** — so you can review the frontend on your phone and share it before the backend exists.

At the end of Part 3 you have a complete, polished, browseable storefront — purely on mock data.

---

## Part 4 — Plan & build the backend (Phases 2–5)

Now slide the real backend in behind the interfaces you already defined.

**Phase 2 — Auth & accounts.**
> *"Execute Phase 2 from SPEC.md: Auth.js with email/password + Google OAuth, email verification, password reset, and wire the account pages (orders, wishlist, addresses, profile)."*

**Phase 3 — Real database.**
1. Create a Postgres project on **Neon** or **Supabase**; copy the connection string.
2. Add it to `.env` as `DATABASE_URL=...` (never commit `.env`).
3. Tell the agent:
   > *"Execute Phase 3: add the full Prisma schema from SPEC.md (§6), create migrations, write the seed script with a realistic demo catalogue **and seeded journal articles**, and migrate the repositories from mock to Prisma-backed — keeping the same interfaces so the UI is unchanged."*
4. Run it: `pnpm db:migrate && pnpm db:seed` (use `pnpm db:studio` to inspect).

**Phase 4 — Cart & checkout, end-to-end (with mocks).**
> *"Execute Phase 4: full cart + checkout against `MockPaymentProvider` and `MockShippingProvider` — pincode serviceability, rates, order creation with stock reservation, order confirmation, account order history, and mock tracking."*

Then **place a test order** in the browser and confirm the confirmation page + order history work. Razorpay/Shiprocket are still mocked — that's expected.

**Phase 5 — Admin panel.**
> *"Execute Phase 5: protected admin for products/variants/inventory, categories, orders (status + mock refund), coupons, reviews moderation, and **Journal/Blog management** (rich-text/MDX editor, cover image, tags, draft/publish, SEO fields)."*

Commit after every phase.

---

## Part 5 — Harden for production (Phase 6)

> *"Execute Phase 6: SEO (per-page metadata, OpenGraph, sitemap.xml, robots.txt, JSON-LD for Product/Organization/BreadcrumbList/Review/Article), performance (next/image + Cloudinary, ISR/caching, Lighthouse ≥ 90), analytics + cookie consent, legal pages (placeholder copy), transactional emails behind the EmailService, structured logging + Sentry hook, security headers + rate limiting, and tests (unit + a Playwright browse→cart→checkout happy path)."*

---

## Part 6 — Deploy

1. Push to GitHub (`git push`).
2. On **Vercel**: *New Project → import `green-diamond`*.
3. Add **Environment Variables** (from your `.env.example`): `DATABASE_URL`, Auth.js secrets, Cloudinary keys, etc. **Leave Razorpay/Shiprocket keys empty for now** and keep flags on mock: `PAYMENTS_PROVIDER=mock`, `SHIPPING_PROVIDER=mock`.
4. Deploy. Every future push to `main` redeploys; every PR gets a preview URL.
5. Point your domain (e.g. `greendiamond.in`) at Vercel when ready.

You now have a fully working store live on the internet — running on mock payments/shipping, safe to demo.

---

## Part 7 — Wire payments & shipping (Phase 7 — the deferred bit)

Only when you're ready to take real orders:

1. Create **Razorpay** and **Shiprocket** accounts (complete KYC). Generate API keys:
   - Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
   - Shiprocket: API user email/password (or token), channel ID, pickup location.
2. Tell the agent:
   > *"Execute Phase 7: implement `RazorpayPaymentProvider` and `ShiprocketShippingProvider` against the existing interfaces (Orders API → Checkout → signature verify → `payment.captured` webhook; Shiprocket order → AWB → tracking + webhook). Don't change the UI."*
3. Add the keys to `.env` (local) and Vercel (prod). **Flip the flags:** `PAYMENTS_PROVIDER=razorpay`, `SHIPPING_PROVIDER=shiprocket`.
4. **Test in sandbox first** — Razorpay test mode + a Shiprocket test order. Configure the webhook URLs in each dashboard to point at `/api/webhooks/razorpay` and `/api/webhooks/shiprocket`.
5. Go live: switch Razorpay to live keys, do one small real transaction, confirm the order → payment → shipment → tracking chain, then open the doors.

---

## Working-with-the-agent checklist (keep it professional)

- **One phase per instruction.** Point at `SPEC.md`; ask for a single phase or batch; review; commit.
- **Branch + PR per phase** (`phase-3-database`, etc.) — keeps history clean and reviewable.
- **Keep `pnpm dev` open** and judge UI in the browser, not just in the diff.
- **Never commit secrets.** `.env` stays local; only `.env.example` is committed.
- **Ask for tests with features**, not after.
- **Use Vercel previews** to review on real devices and share progress.
- If the agent drifts from the spec, say *"re-read SPEC.md §X and align."*

---

### Quick command reference

```bash
pnpm create next-app@latest green-diamond --yes   # scaffold
pnpm dev                                           # run locally (Turbopack)
pnpm build && pnpm start                           # production build
pnpm db:migrate                                    # apply Prisma migrations
pnpm db:seed                                        # load demo catalogue + articles
pnpm db:studio                                     # inspect the database
pnpm lint && pnpm test                             # quality gates
```

> Phase order recap: **0** foundation → **1** frontend (incl. Journal) → **2** auth → **3** database → **4** cart+checkout (mock) → **5** admin → **6** hardening → **deploy** → **7** Razorpay + Shiprocket.
