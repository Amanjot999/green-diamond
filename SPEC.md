# Green Diamond — Master Build Prompt (Phase 1: Full Frontend + Architected Backend)

> **How to use this:** Paste everything below the line into a capable coding agent (Claude Code, or back into this chat) to build the site. It is written as a single, self-contained directive. Razorpay (payments) and Shiprocket (shipping) are intentionally **stubbed behind clean interfaces** so they can be wired in later by filling skeletons + env vars — **no UI rework required.** Currency is **INR (₹)**, market is **India-first**.

---

## ROLE & OBJECTIVE

You are a senior full-stack engineer + product designer. Build **Green Diamond**, a premium direct-to-consumer e-commerce website selling **lab-grown diamonds and lab-grown-diamond jewellery**. Deliver, in this phase, a **fully functional, beautiful, responsive, accessible storefront** with a **backend that is architected up front and implemented**, except **payment capture (Razorpay)** and **shipping fulfilment (Shiprocket)**, which must be implemented as **mock providers behind typed interfaces** with documented TODOs and env placeholders for later integration.

Do not cut corners on the frontend. Every page listed must be real and polished. The checkout must work end-to-end against a **mock payment + mock shipping** layer (i.e., a test order can be placed and a confirmation shown).

---

## 1. BRAND & POSITIONING

- **Name:** Green Diamond
- **Category:** Sustainable luxury — lab-grown diamonds and fine jewellery.
- **One-line positioning:** *"Grown, not mined. Real diamonds. Zero compromise."*
- **Mission:** Make brilliant, certified diamonds accessible without the environmental destruction or human cost of mining.
- **Target audience:** Modern, value- and ethics-conscious buyers (engagement rings, gifts, self-purchase); 24–45; design-led; price-aware but aspirational.
- **Tone of voice:** Elegant, confident, transparent, warm, never preachy. Educational, not defensive.

---

## 2. BRAND MESSAGING & CONTENT PILLARS

Weave these throughout (home, PDP, dedicated education + ethics pages). **Keep every claim accurate and defensible — no greenwashing.**

**Pillar A — They are real diamonds.**
- Lab-grown diamonds are **chemically, physically and optically identical** to mined diamonds — same pure-carbon crystal, same 10 on the Mohs hardness scale, same fire and brilliance.
- They are **certified to the same standards** (IGI, GIA, GCAL) and graded on the same **4Cs** (Cut, Colour, Clarity, Carat).
- Even trained gemologists need lab equipment to distinguish them.

**Pillar B — How they're made (educate, with a simple diagram/animation).**
- **CVD (Chemical Vapour Deposition):** a diamond seed in a carbon-rich gas plasma; diamond grows layer by layer. Tends to produce very clean, colourless stones.
- **HPHT (High Pressure High Temperature):** replicates the heat + pressure deep in the Earth around a seed.
- Frame as: *weeks in a lab vs. billions of years underground + destructive extraction.*

**Pillar C — Ethics / conflict-free (this is core to the brand).**
- **No mining = no "blood diamonds."** Origin is fully traceable.
- **No exploited or child labour;** lab technicians work in safe, regulated facilities — unlike the unsafe, low-pay, sometimes child-labour conditions historically tied to diamond mining.
- Transparent, short supply chain.

**Pillar D — Environment (strong but honest).**
- **No land excavation, no deforestation, no habitat or ecosystem destruction** — diamonds are grown in industrial facilities, not carved out of the earth.
- Dramatically **less earth displaced and less water** than mining per carat.
- **Carbon footprint:** lower than mined **when powered by renewable energy** — but production is energy-intensive, and on a fossil-heavy grid the advantage shrinks. **Therefore: only claim "lower carbon" where backed by renewable-energy or carbon-offset sourcing, and publish/commit to footprint transparency.** Build an honest **"Our Commitments"** page rather than absolute eco-claims.

**Pillar E — Value.**
- Comparable lab-grown stones typically cost **~30–50%+ less** than mined equivalents — more carat, cut or quality for the budget.

**Trust devices to surface:** IGI/GIA certificate badges + downloadable cert on every diamond, 4C explainers, lifetime warranty / buyback messaging (configurable), transparent pricing, secure-checkout badges, easy returns policy.

---

## 3. VISUAL & DESIGN SYSTEM

Aim for **editorial, modern-luxury, lots of whitespace** — think Brilliant Earth / VRAI calibre, with a distinct green-forward identity. Do **not** ship a generic template look.

**Colour palette (define as design tokens in Tailwind v4 `@theme`):**
- Primary: deep **emerald / forest green** (e.g. `#0B3D2E` / `#14532D`).
- Secondary: soft **sage / mint** for fills and eco accents.
- Neutrals: near-black charcoal `#111111`, warm ivory/off-white `#FAF8F4` backgrounds, mid-greys for text.
- Accent (luxury metal): **champagne gold / platinum** `#C8A96A` for fine rules, hovers, badges — used sparingly.
- Ensure WCAG AA contrast (be careful with gold-on-white for text).

**Typography:**
- Display/headings: high-contrast elegant **serif** (e.g. Cormorant Garamond, Playfair Display, or a Didone).
- Body/UI: clean humanist/geometric **sans** (e.g. Inter, Manrope, or Satoshi).
- Generous line-height; refined letter-spacing on display caps.

**Layout & motion:**
- Large hero imagery/video, asymmetric editorial grids, hairline gold dividers, rounded-but-restrained corners, premium shadows.
- Subtle, tasteful motion: fade/slide-in on scroll reveal, gentle parallax, a soft sparkle micro-animation on the logo/CTA, image zoom-on-hover for products. Respect `prefers-reduced-motion`.

**Core components to build:** announcement/promo bar, sticky header with mega-menu (Shop by shape/style/metal/occasion/collections), search overlay, hero, product card (with hover image + quick-view + wishlist heart), filter sidebar + sort, quick-view modal, image gallery with 360°/video support, sticky add-to-cart on PDP, certification & trust badges, ring-size + metal selectors, cart drawer, multi-step checkout, testimonial carousel, FAQ accordion, newsletter block, rich multi-column footer, breadcrumbs, toasts, skeleton loaders, empty states, 404/500 pages.

**Responsiveness & a11y:** mobile-first; semantic HTML; full keyboard navigation; visible focus states; alt text everywhere; ARIA on interactive components; AA colour contrast.

---

## 4. RECOMMENDED TECH STACK (swap-friendly)

> Chosen for a maintainable single-repo full-stack app where the **frontend can be built now and the backend filled in progressively behind service interfaces.** You may substitute equivalents, but keep the layered architecture.

- **Framework:** **Next.js 16** (App Router, **Turbopack** default, **React Compiler** stable) + **TypeScript**. **Node 20.9+**. Use **pnpm**. Scaffold with `create-next-app` (it also generates `AGENTS.md`/`CLAUDE.md` — use them to point coding agents at this spec).
- **Styling:** **Tailwind CSS v4** — define the design tokens (colours, fonts, spacing) **CSS-first via the `@theme` directive in `globals.css`** (no `tailwind.config` needed). Add **shadcn/ui** (or headless Radix) for accessible primitives.
- **State:** Zustand (cart/UI) + React Server Components / server actions for data.
- **Backend:** Next.js Route Handlers / server actions (one repo). *(Alternative if you prefer: a separate NestJS/Express API, or an open-source headless commerce engine like Medusa.js — note the trade-off in the README.)*
- **Database:** PostgreSQL + **Prisma ORM** (managed Postgres: Neon / Supabase / Railway).
- **Auth:** Auth.js (NextAuth) — email/password + Google OAuth, JWT/session, email verification + password reset.
- **Validation:** Zod (shared client+server schemas).
- **Media:** Cloudinary (or S3) via `next/image`.
- **Email:** Resend / Nodemailer (order confirmations, auth emails) behind an interface.
- **Logging/monitoring:** pino + Sentry hook.
- **Deployment:** Vercel (app) + managed Postgres; environment-based config.

---

## 5. ARCHITECTURE OVERVIEW (build for maintainability)

Enforce clean layering so the deferred integrations and the mock→real DB swap are painless:

```
/app                 → routes (storefront + admin + api route handlers)
/components          → UI components (presentational)
/features            → domain modules (cart, catalog, checkout, account, admin)
/lib
  /services          → INTERFACES + implementations (payment, shipping, email, search)
  /repositories      → data access (mock now → Prisma later, same interface)
  /db                → prisma client, schema, seed
  /validation        → zod schemas
  /utils
/config              → env loading, feature flags, money/currency, tax rules
/types               → shared types
/styles              → tokens, globals
/tests               → unit + e2e
```

**Key principle:** UI and route handlers talk only to **service/repository interfaces**, never directly to a vendor SDK or to mock data. Back those interfaces with **mocks now**, real implementations later. Drive provider selection with **feature flags** (`PAYMENTS_PROVIDER`, `SHIPPING_PROVIDER`, `DATA_SOURCE`).

---

## 6. DATA MODEL (Prisma schema)

Implement these entities and relationships:

- **User** (id, name, email, passwordHash?, image?, phone?, role[`customer`|`admin`], emailVerified, createdAt).
- **Address** (id, userId, type[`shipping`|`billing`], fullName, phone, line1, line2?, city, state, pincode, country=`IN`, isDefault).
- **Category/Collection** (id, name, slug, description?, image?, parentId?, kind[`shape`|`style`|`metal`|`occasion`|`collection`]).
- **Product** (id, name, slug, description, sku, type[`loose_diamond`|`ring`|`earrings`|`necklace`|`pendant`|`bracelet`|`bangle`], basePrice, compareAtPrice?, currency=`INR`, status[`draft`|`active`|`archived`], featured, seoTitle?, seoDescription?, createdAt).
- **DiamondSpec** (id, productId? / variantId?, shape, caratWeight, cut, color, clarity, polish, symmetry, fluorescence, measurements, depthPct?, tablePct?, growthMethod[`CVD`|`HPHT`], certLab[`IGI`|`GIA`|`GCAL`], certNumber, certUrl?).
- **ProductVariant** (id, productId, metal?[`14k`|`18k`|`platinum`], metalColor?[`yellow`|`white`|`rose`], ringSize?, centerCarat?, price, sku, stock, lowStockThreshold).
- **Media** (id, productId, url, alt, type[`image`|`video`|`view360`], position).
- **Cart** (id, userId? OR sessionId, createdAt) + **CartItem** (id, cartId, variantId, qty, priceSnapshot, customization?).
- **Wishlist** + **WishlistItem**.
- **Coupon** (id, code, type[`percent`|`fixed`], value, minOrder?, maxDiscount?, startsAt?, endsAt?, usageLimit?, perUserLimit?, active).
- **Order** (id, orderNumber, userId, status[`pending`|`awaiting_payment`|`paid`|`processing`|`shipped`|`delivered`|`cancelled`|`refunded`], subtotal, discountTotal, shippingTotal, taxTotal, grandTotal, currency, couponCode?, shippingAddress JSON snapshot, billingAddress JSON snapshot, placedAt).
- **OrderItem** (id, orderId, productId, variantId, nameSnapshot, sku, qty, unitPrice, lineTotal, certNumber?, customization?).
- **Payment** (id, orderId, provider=`razorpay`, providerOrderId?, providerPaymentId?, providerSignature?, amount, currency, status[`created`|`authorized`|`captured`|`failed`|`refunded`], method?, rawPayload JSON?) — **stub now.**
- **Shipment** (id, orderId, provider=`shiprocket`, shiprocketOrderId?, awbCode?, courier?, status, trackingUrl?, estimatedDelivery?, events JSON?) — **stub now.**
- **Review** (id, productId, userId, rating 1–5, title, body, verifiedPurchase, status[`pending`|`published`|`rejected`], createdAt).
- **BlogPost** (id, title, slug, excerpt, content[rich text/MDX], coverImage, author, category, tags[], readingTime, status[`draft`|`published`], publishedAt, seoTitle?, seoDescription?) — **first-class feature** (see Journal pages below).
- **NewsletterSubscriber**, **ContactMessage/Lead**, **Setting/ContentBlock** (editable homepage banners/copy), **AuditLog** (admin actions).

Add a **seed script** that loads a realistic demo catalogue (loose diamonds across shapes/4Cs + rings/earrings/necklaces with variants, images, certs, categories, a few coupons, sample reviews) so the storefront is fully populated on first run.

---

## 7. FRONTEND — PAGES TO BUILD (all of these, polished)

**Storefront**
1. **Home** — hero, value props (ethical/sustainable/value/certified), shop-by-shape, featured collections, "How lab diamonds are made" teaser, sustainability teaser, bestsellers, testimonials, certification logos, newsletter.
2. **Shop / Product Listing** — for both jewellery and loose diamonds; faceted filters (type, shape, carat range, cut, colour, clarity, metal, price, growth method CVD/HPHT, occasion), sort, pagination/infinite scroll, quick-view, wishlist.
3. **Loose Diamond Search** — a dedicated 4C-driven diamond finder (table/grid, sliders for carat/price, shape pills, cert filter) — a signature feature for this category.
4. **Product Detail (PDP)** — gallery (image/video/360), price + compare-at, metal/colour/ring-size/center-carat selectors, live stock, full diamond specs + downloadable certificate, 4C mini-explainers, add-to-cart / add-to-wishlist, trust + shipping/returns blurbs, reviews, related products, sticky add-to-cart on mobile.
5. **Cart** (page + slide-over drawer) — line items, qty, remove, coupon, order summary, proceed to checkout.
6. **Checkout** (multi-step: Address → Shipping method → Review → Payment → Confirmation) — fully built UI; **pincode serviceability + rate via mock shipping**, **payment via mock provider**; produces a real order + **Order Confirmation** page. Clearly marked integration seams for Razorpay & Shiprocket.
7. **Account** — dashboard, **Orders** (list + detail + track-shipment view, all mock), **Wishlist**, **Addresses** (CRUD), **Profile/settings**.
8. **Auth** — login, register, forgot password, reset password, email verification, OAuth.
9. **About / Our Story.**
10. **How Lab Diamonds Are Made** — CVD vs HPHT explainer with visuals.
11. **Sustainability & Ethics / Our Commitments** — honest environmental + conflict-free story (per §2 guardrails).
12. **Diamond Education / 4C Buying Guide.**
13. **Certification** — explain IGI/GIA/GCAL, how to read a cert.
14. **Contact** (form → ContactMessage), **FAQ** (accordion), **Store/Showroom** (optional).
15. **Journal / Blog** — a polished editorial content hub (brand-building + SEO). Build: **Journal index** (featured post + responsive card grid, category/tag filters, pagination), **category/tag archive pages**, and **single-post pages** (large cover, rich typographic article body with headings/quotes/images, author + date + reading time, social share, related posts, inline newsletter CTA, breadcrumb). Seed with several real-feeling articles (e.g. "Lab-grown vs mined: the honest comparison", "How a CVD diamond is grown", "Understanding the 4Cs", "How to choose an engagement ring"). Add `Article`/`BlogPosting` JSON-LD.
16. **Legal:** Privacy Policy, Terms of Service, Shipping Policy, Returns & Refunds, Warranty/Buyback. (Provide clear placeholder copy to be reviewed by counsel.)
17. **Search results**, **404**, **500**, **maintenance** states.

---

## 8. BACKEND — API DESIGN

Implement these (behind the service/repository layer):

- **Auth:** register, login, logout, session, verify-email, forgot/reset password, OAuth callback.
- **Catalog:** products (list w/ filters+sort+pagination+search), product by slug, related, by category/collection; categories/collections list+detail; loose-diamond search endpoint.
- **Cart:** get, add, update qty, remove, clear, apply/remove coupon (works for guest via session + logged-in).
- **Wishlist:** get, add, remove.
- **Checkout:** validate cart + compute totals (subtotal, discount, **configurable GST tax rule** — verify current gems & jewellery GST rate, do not hardcode law), `GET shipping/serviceability?pincode=` (**mock**), `GET shipping/rates` (**mock**), `POST payment/create` (**mock → Razorpay later**), `POST payment/verify` (**mock → Razorpay signature later**), `POST orders` (place order, reserve stock, snapshot addresses/prices).
- **Orders:** list (user), get, cancel, reorder; `GET orders/:id/tracking` (**mock → Shiprocket later**).
- **Reviews:** list for product, create (auth + verified purchase), moderation (admin).
- **Misc:** contact submit, newsletter subscribe.
- **Journal/Blog:** list posts (with category/tag filter + pagination), post by slug, related posts, list categories/tags; admin create/update/publish.
- **Webhooks:** `POST /api/webhooks/razorpay` (**stub** — verify signature, update Payment/Order), `POST /api/webhooks/shiprocket` (**stub** — update Shipment tracking).
- **Admin API:** products/variants/inventory CRUD, categories CRUD, orders (status update, refund), coupons CRUD, reviews moderation, content/banners, customers, dashboard stats.

All inputs validated with Zod; consistent error shape; pagination + rate limiting on sensitive routes.

---

## 9. DEFERRED INTEGRATIONS — RAZORPAY & SHIPROCKET (build the seams now, wire later)

**This is the part to "leave till later" — but make later trivial.** Implement both as interfaces with working mocks + skeleton real implementations selected by env flag.

### Payments — `PaymentProvider` interface
```ts
interface PaymentProvider {
  createOrder(input: { amountInPaise: number; currency: 'INR'; receipt: string; notes?: Record<string,string> }): Promise<{ providerOrderId: string; amount: number; currency: string }>;
  verifyPayment(payload: { orderId: string; paymentId: string; signature: string }): Promise<boolean>;
  refund(paymentId: string, amountInPaise?: number): Promise<{ refundId: string; status: string }>;
  handleWebhook(req: Request): Promise<{ event: string; orderId?: string; status?: string }>;
}
```
- **`MockPaymentProvider` (use now):** returns fake `providerOrderId`/`paymentId`, always verifies true in test mode, lets the full order flow complete and show confirmation.
- **`RazorpayPaymentProvider` (skeleton + TODOs):** Razorpay **Orders API** → frontend Razorpay **Checkout** script → server-side **signature verification** → **`payment.captured`/`refunded` webhook**. Env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. Supports cards, UPI, netbanking, wallets.
- Frontend: render the real Razorpay checkout only when `PAYMENTS_PROVIDER=razorpay`; otherwise the mock step. **No UI change needed to switch.**

### Shipping — `ShippingProvider` interface
```ts
interface ShippingProvider {
  checkServiceability(pincode: string): Promise<{ serviceable: boolean; couriers?: Array<{ id: string; name: string; etaDays: number; rate: number }> }>;
  getRates(input: { destinationPincode: string; weightKg: number; subtotal: number }): Promise<Array<{ id: string; name: string; etaDays: number; rate: number }>>;
  createShipment(orderId: string): Promise<{ shiprocketOrderId: string; awbCode: string; courier: string; trackingUrl: string; label?: string }>;
  getTracking(awbCode: string): Promise<{ status: string; events: Array<{ ts: string; location?: string; description: string }>; estimatedDelivery?: string }>;
  cancelShipment(awbCode: string): Promise<{ cancelled: boolean }>;
}
```
- **`MockShippingProvider` (use now):** serviceable everywhere, flat-rate (e.g. free over ₹X / ₹Y otherwise), fake AWB + a deterministic mock tracking timeline.
- **`ShiprocketShippingProvider` (skeleton + TODOs):** authenticate via API user (token), create order, generate AWB, fetch tracking, handle tracking webhook. Env: `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD` (or `SHIPROCKET_API_TOKEN`), `SHIPROCKET_CHANNEL_ID`, `SHIPROCKET_PICKUP_LOCATION`.
- Note in README: Razorpay and Shiprocket are official partners; Razorpay Magic Checkout can also pull Shiprocket tracking — keep our abstraction compatible with either path.

Mark **every** TODO with `// TODO(razorpay):` / `// TODO(shiprocket):` and centralise both in `/lib/services/`.

---

## 10. CROSS-CUTTING REQUIREMENTS

- **Security:** hashed passwords (argon2/bcrypt), session/JWT, CSRF protection, secure headers (CSP, HSTS), rate limiting (auth/contact/checkout), server-side input validation, no secrets in client, webhook signature verification (stubbed but structured).
- **SEO:** per-page metadata + OpenGraph/Twitter, canonical URLs, `sitemap.xml` + `robots.txt`, **JSON-LD** (`Product`, `Organization`, `BreadcrumbList`, `Review`), clean slugs, fast LCP. Long-tail-friendly content (e.g. "certified IGI lab-grown diamond engagement ring under ₹1 lakh").
- **Performance:** `next/image` + Cloudinary, lazy loading, code splitting, ISR/static where possible, caching, compressed assets, Lighthouse ≥ 90.
- **Analytics & consent:** GA4 or Plausible behind a cookie-consent banner; basic event tracking (view item, add to cart, begin checkout, purchase).
- **Notifications/email:** order confirmation, shipping update (mock), auth emails — behind an `EmailService` interface.
- **Internationalisation/money:** INR formatting, paise-safe money utilities, GST as configurable tax rule (verify current rate; don't hardcode law).
- **Error handling:** typed error responses, React error boundaries, friendly fallback UI, structured logging (pino) + Sentry hook.

---

## 11. ADMIN PANEL

Protected (`role=admin`) dashboard: KPIs (sales, orders, AOV, top products), **Products/Variants/Inventory** CRUD with media + diamond specs + cert upload, **Categories/Collections** CRUD, **Orders** (view, update status, trigger refund — mock, view shipment — mock), **Coupons** CRUD, **Reviews** moderation, **Customers** view, **Journal/Blog** management (create/edit/publish posts with rich-text/MDX editor, cover image, categories/tags, SEO fields, draft/publish), **Content/Banners** editor, settings. Audit-log admin actions.

---

## 12. MAINTENANCE & OPS

- `README.md` (setup, architecture, how to swap mock→Razorpay/Shiprocket, env reference), **`.env.example`** with every key.
- Scripts: `dev`, `build`, `start`, `lint`, `format`, `db:migrate`, `db:seed`, `db:studio`, `test`, `test:e2e`.
- Prisma migrations; ESLint + Prettier; Husky + lint-staged pre-commit; commit conventions.
- **Testing:** Vitest/Jest unit tests (money/tax, cart totals, coupon logic, providers) + Playwright e2e for the **browse → cart → checkout → mock order** happy path.
- CI (GitHub Actions): install, lint, typecheck, test, build on PR.
- DB backup guidance; monitoring/alerts via Sentry; documented runbook for go-live (flip flags, add real keys, verify webhooks).

---

## 13. BUILD ORDER (phased — follow this sequence)

- **Phase 0 — Foundation:** repo, stack, design tokens + component library, base layout/header/footer, env + feature-flag scaffolding, **mock data + service/repository interfaces**.
- **Phase 1 — Storefront (mock-backed):** every page in §7 built and browseable against mocks — **including the full Journal/Blog (index, archives, single post)**.
- **Phase 2 — Auth & accounts.**
- **Phase 3 — Real DB:** Prisma schema + migrations + seed; migrate repositories from mock to Postgres (same interfaces).
- **Phase 4 — Cart & checkout:** end-to-end with `MockPaymentProvider` + `MockShippingProvider`; real Order created; confirmation + account order history + mock tracking.
- **Phase 5 — Admin panel.**
- **Phase 6 — Hardening:** SEO, performance, analytics+consent, legal pages, emails, tests, error handling, security.
- **Phase 7 — DEFERRED (later):** implement `RazorpayPaymentProvider` + webhook; implement `ShiprocketShippingProvider` + webhook; flip flags; go-live runbook. *(Do not implement in this phase — only leave the seams.)*

---

## 14. DELIVERABLE / ACCEPTANCE CRITERIA (this phase)

✅ Polished, responsive, AA-accessible storefront with **all** §7 pages.
✅ Faceted shop + dedicated loose-diamond 4C finder + rich PDP with specs & downloadable cert.
✅ Working cart + **end-to-end checkout to a successful MOCK order + confirmation**, with mock pincode serviceability, mock rates, mock tracking.
✅ Auth + user accounts (orders, wishlist, addresses, profile).
✅ Postgres + Prisma + seed (fully populated demo catalogue).
✅ Admin panel (catalog/orders/coupons/reviews/**journal**/content).
✅ **Full Journal/Blog** (index, category/tag archives, single-post pages) with seeded articles, rich article styling, and `Article` JSON-LD.
✅ **Razorpay & Shiprocket fully abstracted** behind interfaces with mocks live and clearly-marked skeletons + env placeholders for later.
✅ SEO, JSON-LD, sitemap/robots, analytics+consent, legal placeholders, emails (interface), structured logging.
✅ `README.md` + `.env.example` + tests (unit + e2e happy path) + CI passing.
✅ Honest, certification-backed sustainability/ethics messaging (no greenwashing).

---

## 15. REFERENCES

**Design / UX inspiration (ethical & lab-grown leaders):** Brilliant Earth, VRAI, Clean Origin, MiaDonna, Ada Diamonds, Ritani, Whiteflash.

**Diamond education & certification:** IGI (igi.org), GIA (gia.edu), GCAL — the 4Cs, CVD vs HPHT, reading a certificate.

**Deferred integrations (for Phase 7):**
- Razorpay Payments docs — `razorpay.com/docs`
- Razorpay × Shiprocket partnership / Magic Checkout tracking — `razorpay.com/docs/payments/magic-checkout/rto-reduction/logistics-partners/shiprocket/`
- Shiprocket APIs / Razorpay partner page — `shiprocket.in/partner-integrations/razorpay/`

**Stack docs:** Next.js, Tailwind CSS, Prisma, Auth.js, Zod, Cloudinary.

> Reminder: keep all sustainability/environmental claims accurate and backed by certification or renewable-energy/offset commitments. Lab-grown is **conflict-free and free of mining's land/habitat destruction**, but the **carbon advantage is conditional on the energy source** — message with integrity.
