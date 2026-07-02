import { Container } from "@/components/ui/container";

const labs = ["IGI", "GIA", "GCAL"];

export function CertLogos() {
  return (
    <div className="border-y border-border bg-background">
      <Container className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Every diamond independently graded &amp; certified
        </p>
        <ul className="flex flex-wrap items-center gap-8">
          {labs.map((lab) => (
            <li
              key={lab}
              className="font-serif text-2xl tracking-[0.2em] text-charcoal/70"
              aria-label={`${lab} certified`}
            >
              {lab}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
