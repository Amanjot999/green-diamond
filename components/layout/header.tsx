import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

const icons = [
  { label: "Search", href: "/search", Icon: Search, always: true },
  { label: "Account", href: "/account", Icon: User, always: false },
  { label: "Wishlist", href: "/wishlist", Icon: Heart, always: false },
  { label: "Cart", href: "/cart", Icon: ShoppingBag, always: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <MobileMenu />
          <Logo />
        </div>

        <DesktopNav />

        <div className="flex items-center gap-1">
          {icons.map(({ label, href, Icon, always }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={`${always ? "inline-flex" : "hidden sm:inline-flex"} h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-primary`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}
