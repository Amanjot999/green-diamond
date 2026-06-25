import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

/** Primary navigation. Mega-menu + search overlay + cart drawer arrive in Phase 1. */
const nav = [
  { label: "Engagement", href: "/shop?occasion=engagement" },
  { label: "Diamonds", href: "/diamonds" },
  { label: "Jewellery", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Education", href: "/education" },
  { label: "Journal", href: "/journal" },
];

const icons = [
  { label: "Search", href: "/search", Icon: Search },
  { label: "Account", href: "/account", Icon: User },
  { label: "Wishlist", href: "/wishlist", Icon: Heart },
  { label: "Cart", href: "/cart", Icon: ShoppingBag },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          {icons.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-primary"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </Container>

      {/* Mobile: scrollable nav strip (mega-menu replaces this in Phase 1) */}
      <nav aria-label="Primary mobile" className="lg:hidden border-t border-border">
        <Container>
          <ul className="flex items-center gap-5 overflow-x-auto py-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.label} className="whitespace-nowrap">
                <Link href={item.href} className="text-foreground/80 hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
