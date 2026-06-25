import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation (SPEC §5, §10).
 *
 * Everything has a safe default so Phase 0 runs with zero configuration and
 * all providers default to `mock`. Deferred-integration secrets (Razorpay,
 * Shiprocket, DB, auth, media) are optional now and wired in later phases.
 *
 * Do NOT import this module into client components — it is server-only.
 */
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // App
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),

  // Provider selection — the swappable seam (SPEC §5, §9)
  PAYMENTS_PROVIDER: z.enum(["mock", "razorpay"]).default("mock"),
  SHIPPING_PROVIDER: z.enum(["mock", "shiprocket"]).default("mock"),
  DATA_SOURCE: z.enum(["mock", "prisma"]).default("mock"),

  // Commerce config (configurable — not hardcoded law)
  GST_RATE_PERCENT: z.coerce.number().min(0).max(100).default(3),
  FREE_SHIPPING_THRESHOLD_INR: z.coerce.number().min(0).default(50000),
  FLAT_SHIPPING_RATE_INR: z.coerce.number().min(0).default(150),

  // Phase 3 — database
  DATABASE_URL: z.string().optional(),

  // Phase 2 — auth
  AUTH_SECRET: z.string().optional(),
  AUTH_URL: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Phase 6 — email / media / monitoring
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SENTRY_DSN: z.string().optional(),

  // Phase 7 — Razorpay (deferred)
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // Phase 7 — Shiprocket (deferred)
  SHIPROCKET_EMAIL: z.string().optional(),
  SHIPROCKET_PASSWORD: z.string().optional(),
  SHIPROCKET_API_TOKEN: z.string().optional(),
  SHIPROCKET_CHANNEL_ID: z.string().optional(),
  SHIPROCKET_PICKUP_LOCATION: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return parsed.data;
}

export const env = loadEnv();
