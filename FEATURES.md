# Feature Log

> **Auto-maintained — don't edit the generated bullet lines.**
> Updated by `scripts/update-features.mjs` via the git `post-commit` hook
> (activated by `pnpm install`, or manually: `node scripts/setup-hooks.mjs`).
>
> - A commit whose subject starts with `feat:` / `feat(scope):` adds an entry here
>   (title = commit subject, description = commit body).
> - Any later commit that touches a feature's files bumps its "Last updated"
>   (file renames are tracked).
> - When **all** of a feature's files are deleted, its entry is struck through and
>   marked removed. Entries are never deleted or rewritten otherwise.
> - The text below each `<!-- description -->` marker is yours — edit freely, it is preserved.
> - Rebuild from scratch: `pnpm features:backfill` (overwrites manual description edits).

<!-- feature:begin id="phase-0-foundation-design-system-config-service-repository-s" status="active" added="2026-06-25" updated="2026-07-02" updatedBy="feat(content): real demo imagery via free-license stock CDNs (Unsplash/Pexels)" removed="" createdBy="feat: phase 0 foundation — design system, config, service/repository seams" files="frontend/.env.example,frontend/components/brand/logo.tsx,frontend/components/layout/announcement-bar.tsx,frontend/components/layout/footer.tsx,frontend/components/layout/header.tsx,frontend/components/ui/badge.tsx,frontend/components/ui/button.tsx,frontend/components/ui/container.tsx,frontend/components/ui/index.ts,backend/src/config/env.ts,backend/src/config/flags.ts,backend/src/config/money.ts,backend/src/config/tax.ts,backend/src/repositories/cart/index.ts,backend/src/repositories/cart/mock.ts,backend/src/repositories/cart/types.ts,backend/src/repositories/catalog/index.ts,backend/src/repositories/catalog/mock.ts,backend/src/repositories/catalog/types.ts,backend/src/repositories/index.ts,backend/src/repositories/mock-data/catalog.ts,backend/src/services/email/index.ts,backend/src/services/email/mock.ts,backend/src/services/email/types.ts,backend/src/services/index.ts,backend/src/services/payment/index.ts,backend/src/services/payment/mock.ts,backend/src/services/payment/razorpay.ts,backend/src/services/payment/types.ts,backend/src/services/shipping/index.ts,backend/src/services/shipping/mock.ts,backend/src/services/shipping/shiprocket.ts,backend/src/services/shipping/types.ts,frontend/lib/utils/cn.ts,frontend/public/images/placeholder.svg,backend/src/types/cart.ts,backend/src/types/catalog.ts,backend/src/types/common.ts,backend/src/types/index.ts" -->
### Phase 0 foundation — design system, config, service/repository seams

- Added: 2026-06-25
- Last updated: 2026-07-02 — `feat(content): real demo imagery via free-license stock CDNs (Unsplash/Pexels)`
- Files tracked: 39

<!-- description -->
- Tailwind v4 @theme design tokens (emerald/sage/champagne-gold luxury palette),
  Cormorant Garamond + Inter fonts, reduced-motion handling
- Config layer: paise-safe INR money utils, configurable GST tax rule,
  feature flags (PAYMENTS_PROVIDER/SHIPPING_PROVIDER/DATA_SOURCE),
  Zod-validated server env, .env.example
- Shared domain types mirroring the SPEC §6 data model
- Service interfaces + live mocks + deferred skeletons: PaymentProvider
  (Mock/Razorpay), ShippingProvider (Mock/Shiprocket), EmailService
- Repository interfaces + in-memory mock catalogue (seed data) and cart
- UI primitives (Button, Container, Badge, Logo) + layout shells
  (announcement bar, header, footer)

UI talks only to service/repository interfaces. Razorpay & Shiprocket stay
mocked behind typed seams. Build + lint clean.
<!-- feature:end -->

<!-- feature:begin id="home-page-product-card-mega-menu-navigation-batch-3-1" status="active" added="2026-06-25" updated="2026-07-02" updatedBy="feat(content): real demo imagery via free-license stock CDNs (Unsplash/Pexels)" removed="" createdBy="feat(ui): home page, product card & mega-menu navigation (batch 3.1)" files="frontend/components/home/bestsellers.tsx,frontend/components/home/cert-logos.tsx,frontend/components/home/dual-teaser.tsx,frontend/components/home/featured-collections.tsx,frontend/components/home/hero.tsx,frontend/components/home/newsletter-cta.tsx,frontend/components/home/shop-by-shape.tsx,frontend/components/home/testimonials.tsx,frontend/components/layout/desktop-nav.tsx,frontend/components/layout/mobile-menu.tsx,frontend/components/layout/nav-data.ts,frontend/components/product/price.tsx,frontend/components/product/product-card.tsx,frontend/components/product/rating.tsx,frontend/components/product/shape-icon.tsx,frontend/components/product/wishlist-button.tsx,frontend/components/ui/section.tsx" -->
### Home page, product card & mega-menu navigation (batch 3.1)

- Added: 2026-06-25
- Last updated: 2026-07-02 — `feat(content): real demo imagery via free-license stock CDNs (Unsplash/Pexels)`
- Files tracked: 17

<!-- description -->
- Polished home: hero, certification strip, shop-by-shape, collections,
  bestsellers (mock-backed), how-it's-made + sustainability teasers,
  testimonials, newsletter band
- Reusable storefront primitives: ProductCard, Price, Rating, WishlistButton,
  ShapeIcon, Section/SectionHeading
- Desktop CSS mega-menu (hover + focus-within) + accessible mobile drawer
- next/image config to serve placeholder SVGs (real imagery in Phase 6)
<!-- feature:end -->

<!-- feature:begin id="shop-listing-faceted-filters-sort-quick-view-batch-3-2" status="active" added="2026-06-25" updated="2026-07-02" updatedBy="feat(ui): loose-diamond 4C finder (batch 3.4)" removed="" createdBy="feat(ui): shop listing, faceted filters, sort & quick-view (batch 3.2)" files="frontend/app/shop/loading.tsx,frontend/app/shop/page.tsx,frontend/components/product/quick-view.tsx,frontend/components/shop/active-filters.tsx,frontend/components/shop/filter-sidebar.tsx,frontend/components/shop/mobile-filters.tsx,frontend/components/shop/pagination.tsx,frontend/components/shop/sort-select.tsx,frontend/components/shop/use-shop-params.ts,frontend/components/ui/breadcrumbs.tsx,frontend/components/ui/empty-state.tsx,frontend/components/ui/modal.tsx,backend/src/shop/facets.ts" -->
### Shop listing, faceted filters, sort & quick-view (batch 3.2)

- Added: 2026-06-25
- Last updated: 2026-07-02 — `feat(ui): loose-diamond 4C finder (batch 3.4)`
- Files tracked: 13

<!-- description -->
Add the storefront shop page against the mock catalog repository:
filter sidebar (type, shape, price, carat, cut, colour, clarity, metal,
growth), active-filter chips, sort, pagination, and a mobile filter
drawer, all driven by shareable URL params. Add an accessible Modal
primitive plus the product-card quick-view, and breadcrumbs/empty-state
UI primitives.
<!-- feature:end -->

<!-- feature:begin id="add-mobile-filters-component-for-responsive-filtering-option" status="active" added="2026-07-02" updated="2026-07-02" updatedBy="feat: add product detail page and related components" removed="" createdBy="feat: add mobile filters component for responsive filtering options" files="HOW_TO_RUN.md,backend/package.json,backend/tsconfig.json,frontend/package.json" -->
### Frontend/backend workspace split & run guide

- Added: 2026-07-02
- Last updated: 2026-07-02 — `feat: add product detail page and related components`
- Files tracked: 4

<!-- description -->
Restructured the repo into a pnpm workspace: `frontend/` (the Next.js app) and
`backend/` (services, repositories, domain config & types), connected via the
`@backend/*` import alias. Added `HOW_TO_RUN.md` and pinned the dev server to
port 3001.

_Note: this commit's message was auto-generated ("add mobile filters component")
and doesn't reflect the actual change — the mobile filters component itself
shipped in batch 3.2._
<!-- feature:end -->

<!-- feature:begin id="implement-automated-features-log-management-with-git-hooks" status="active" added="2026-07-02" updated="2026-07-02" updatedBy="feat: add product detail page and related components" removed="" createdBy="feat: implement automated features log management with git hooks" files=".gitattributes,scripts/git-hooks/post-commit,scripts/setup-hooks.mjs,scripts/update-features.mjs" -->
### Implement automated features log management with git hooks

- Added: 2026-07-02
- Last updated: 2026-07-02 — `feat: add product detail page and related components`
- Files tracked: 4

<!-- description -->
_No description in the commit message._
<!-- feature:end -->

<!-- feature:begin id="add-product-detail-page-and-related-components" status="active" added="2026-07-02" updated="" updatedBy="" removed="" createdBy="feat: add product detail page and related components" files="backend/src/repositories/mock-data/reviews.ts,frontend/app/products/[slug]/loading.tsx,frontend/app/products/[slug]/not-found.tsx,frontend/app/products/[slug]/page.tsx,frontend/components/product/four-cs.tsx,frontend/components/product/gallery.tsx,frontend/components/product/product-labels.ts,frontend/components/product/purchase-panel.tsx,frontend/components/product/reviews.tsx,frontend/components/product/spec-table.tsx,frontend/components/product/trust-blurbs.tsx,scripts/update-structure.mjs" -->
### Add product detail page and related components

- Added: 2026-07-02
- Files tracked: 12

<!-- description -->
- Implemented ProductNotFound component for unavailable products.
- Created ProductPage component to display product details, including metadata generation.
- Added FourCs component to explain diamond specifications.
- Developed Gallery component for product media display with thumbnail navigation.
- Enhanced ProductCard to include link accessibility.
- Introduced ProductLabels for shared display labels across product UI.
- Built PurchasePanel for product purchasing functionality, including variant selection and quantity management.
- Added Reviews component to display customer feedback and ratings.
- Created SpecTable for detailed diamond specifications and certificate verification.
- Developed TrustBlurbs for shipping, returns, and certification information.
- Updated package.json to include structure update script.
- Enhanced post-commit hook to regenerate STRUCTURE.md alongside FEATURES.md.
- Created update-structure script to maintain repository structure documentation.
<!-- feature:end -->

<!-- feature:begin id="loose-diamond-4c-finder-batch-3-4" status="active" added="2026-07-02" updated="" updatedBy="" removed="" createdBy="feat(ui): loose-diamond 4C finder (batch 3.4)" files="frontend/app/diamonds/loading.tsx,frontend/app/diamonds/page.tsx,frontend/components/diamonds/diamond-results.tsx,frontend/components/diamonds/finder-filters.tsx,frontend/components/ui/range-slider.tsx" -->
### Loose-diamond 4C finder (batch 3.4)

- Added: 2026-07-02
- Files tracked: 5

<!-- description -->
Dedicated /diamonds finder per SPEC §7.3: shape grid, dual-thumb carat and
price sliders (URL-committed, debounced), cut/colour/clarity/cert/growth
filters, spec table on desktop and tappable spec cards on mobile, active
filter chips, sort, pagination and 4C explainers. Adds certLab to
ProductQuery + cert URL param, finder slider bounds in facets, and a
reusable accessible RangeSlider primitive.
<!-- feature:end -->

<!-- feature:begin id="real-demo-imagery-via-free-license-stock-cdns-unsplash-pexel" status="active" added="2026-07-02" updated="" updatedBy="" removed="" createdBy="feat(content): real demo imagery via free-license stock CDNs (Unsplash/Pexels)" files="backend/src/repositories/mock-data/catalog.ts,frontend/components/home/hero.tsx,frontend/next.config.ts" -->
### Real demo imagery via free-license stock CDNs (Unsplash/Pexels)

- Added: 2026-07-02
- Files tracked: 3

<!-- description -->
Replaces the placeholder SVG with verified hotlinked stock photography:
multi-image product galleries (rings, bracelet, pendant, loose stones),
lifestyle hero, and next/image remotePatterns for images.unsplash.com and
images.pexels.com. Every URL curl-verified (HTTP 200) and visually reviewed
on a contact sheet before assignment. TODO(phase-6): swap for owned product
photography via Cloudinary.
<!-- feature:end -->
