import { Container } from "@/components/ui/container";

const messages = [
  "Complimentary insured shipping over ₹50,000",
  "Every diamond IGI / GIA certified",
  "Lifetime warranty & buyback",
];

/** Thin promo bar above the header (SPEC §3 core components). */
export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex h-9 items-center justify-center gap-3 text-center text-xs tracking-wide">
        {messages.map((message, i) => (
          <span key={message} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-accent">·</span>}
            <span className={i === 0 ? "" : "hidden sm:inline"}>{message}</span>
          </span>
        ))}
      </Container>
    </div>
  );
}
