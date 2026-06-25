# Green Diamond

@AGENTS.md

**Source of truth:** [`SPEC.md`](./SPEC.md). Build **strictly phase by phase** (SPEC §13). UI talks
**only** to the service/repository interfaces — never call vendor SDKs or mock data directly. Razorpay
& Shiprocket stay **mocked** behind typed interfaces, flipped by feature flags. Money is INR /
paise-safe; GST is configurable (not hardcoded law); validate everything with Zod; ship WCAG AA.
