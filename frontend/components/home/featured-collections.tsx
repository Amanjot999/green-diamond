import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";

const collections = [
  {
    title: "Bestsellers",
    description: "Our most-loved rings, studs and solitaires.",
    href: "/collections/bestsellers",
    className: "bg-forest-800 text-primary-foreground",
  },
  {
    title: "Signature",
    description: "Statement stones and standout settings.",
    href: "/collections/signature",
    className: "bg-sage-200 text-forest-900",
  },
  {
    title: "New Arrivals",
    description: "The latest additions to the collection.",
    href: "/collections/new-arrivals",
    className: "bg-gold-200 text-gold-700",
  },
];

export function FeaturedCollections() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Curated" title="Collections" align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className={`group flex aspect-[4/3] flex-col justify-end rounded-xl p-7 transition-transform duration-300 ease-luxe hover:-translate-y-1 ${c.className}`}
            >
              <h3 className="font-serif text-2xl">{c.title}</h3>
              <p className="mt-1 text-sm opacity-90">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
