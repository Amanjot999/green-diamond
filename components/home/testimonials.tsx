import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const testimonials = [
  {
    quote:
      "The certificate matched everything they promised, and the ring is breathtaking. I genuinely couldn't tell it apart from my mother's mined solitaire.",
    name: "Aanya R.",
    detail: "Mumbai · Engagement ring",
  },
  {
    quote:
      "Better value meant I could go up a full carat. The team walked me through the 4Cs with zero pressure.",
    name: "Karthik V.",
    detail: "Bengaluru · Loose diamond",
  },
  {
    quote:
      "Knowing it's conflict-free and didn't tear up the earth mattered to us. The studs are an everyday joy.",
    name: "Meera & Sam",
    detail: "Delhi · Halo studs",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading eyebrow="In their words" title="Loved across India" align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-xl border border-border bg-background p-7">
              <div className="flex gap-0.5 text-gold-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium text-charcoal">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
