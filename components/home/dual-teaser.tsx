import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const panels = [
  {
    Icon: Sparkles,
    eyebrow: "The science",
    title: "How a lab diamond is grown",
    body: "CVD and HPHT recreate the conditions diamonds form under — weeks in a lab versus billions of years underground, with no destructive extraction.",
    href: "/how-its-made",
    label: "See how it's made",
    className: "bg-forest-900 text-primary-foreground",
  },
  {
    Icon: Leaf,
    eyebrow: "Our commitments",
    title: "Sustainability, told honestly",
    body: "No mining means no land or habitat destruction and a traceable, conflict-free origin. We only claim a lower carbon footprint where it's backed by renewable energy.",
    href: "/sustainability",
    label: "Read our commitments",
    className: "bg-sage-100 text-forest-900",
  },
];

export function DualTeaser() {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {panels.map((p) => (
            <div key={p.title} className={`flex flex-col rounded-xl p-8 sm:p-10 ${p.className}`}>
              <p.Icon className="h-7 w-7 opacity-80" strokeWidth={1.5} />
              <span className="mt-6 text-xs font-semibold uppercase tracking-widest opacity-80">
                {p.eyebrow}
              </span>
              <h3 className="mt-2 font-serif text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-90">{p.body}</p>
              <Link
                href={p.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {p.label}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
