import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Engagement Rings", href: "/shop?occasion=engagement" },
      { label: "Loose Diamonds", href: "/diamonds" },
      { label: "Earrings", href: "/shop?type=earrings" },
      { label: "Necklaces", href: "/shop?type=necklace" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "How Lab Diamonds Are Made", href: "/how-its-made" },
      { label: "The 4Cs", href: "/education" },
      { label: "Certification", href: "/certification" },
      { label: "Sustainability & Ethics", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Our Commitments", href: "/sustainability" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping Policy", href: "/legal/shipping" },
      { label: "Returns & Refunds", href: "/legal/returns" },
      { label: "Warranty & Buyback", href: "/legal/warranty" },
      { label: "Track Order", href: "/account/orders" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Grown, not mined. Real, certified diamonds — without the environmental
              destruction or human cost of mining.
            </p>
            <form className="mt-6 flex max-w-xs items-center gap-2">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <div className="relative flex-1">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Email for early access"
                  className="h-11 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-primary"
                />
              </div>
              {/* TODO(phase-6): wire newsletter subscribe to the API */}
              <button
                type="button"
                className="h-11 shrink-0 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-700"
              >
                Join
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>IGI · GIA · GCAL certified</span>
          <span aria-hidden className="text-accent">·</span>
          <span>Secure checkout</span>
          <span aria-hidden className="text-accent">·</span>
          <span>Lifetime warranty & buyback</span>
          <span aria-hidden className="text-accent">·</span>
          <span>Conflict-free, traceable origin</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Green Diamond. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-primary">Terms</Link>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3h1.4V5.8a20 20 0 0 0-2-.1c-2 0-3.4 1.2-3.4 3.5v1.9H8.5V14h2.3v7z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
