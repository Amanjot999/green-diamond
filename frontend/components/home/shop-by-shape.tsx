import Link from "next/link";
import type { DiamondShape } from "@backend/types";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ShapeIcon } from "@/components/product/shape-icon";

const shapes: { shape: DiamondShape; label: string }[] = [
  { shape: "round", label: "Round" },
  { shape: "oval", label: "Oval" },
  { shape: "cushion", label: "Cushion" },
  { shape: "princess", label: "Princess" },
  { shape: "emerald", label: "Emerald" },
  { shape: "pear", label: "Pear" },
];

export function ShopByShape() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Find your stone"
          title="Shop by shape"
          actionHref="/diamonds"
          actionLabel="All diamonds"
        />
        <ul className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {shapes.map(({ shape, label }) => (
            <li key={shape}>
              <Link
                href={`/diamonds?shape=${shape}`}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-2 py-6 text-center text-charcoal transition-colors hover:border-accent hover:text-primary"
              >
                <ShapeIcon shape={shape} className="text-accent" />
                <span className="text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
