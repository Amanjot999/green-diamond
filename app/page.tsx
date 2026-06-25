import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

const valueProps = [
  {
    title: "Real, certified diamonds",
    body: "Chemically identical to mined — graded on the same 4Cs and certified by IGI, GIA & GCAL.",
  },
  {
    title: "Conflict-free by origin",
    body: "No mining means no blood-diamond risk, and a short, fully traceable supply chain.",
  },
  {
    title: "No land or habitat loss",
    body: "Grown in facilities, not carved from the earth — far less water and earth displaced.",
  },
  {
    title: "30–50%+ better value",
    body: "More carat, cut and quality for your budget than a comparable mined stone.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sage-50 via-background to-background" />
        <Container className="flex flex-col items-center py-24 text-center sm:py-32">
          <Badge variant="gold" className="animate-fade-in">
            Sustainable luxury
          </Badge>
          <h1 className="mt-6 max-w-3xl animate-fade-up font-serif text-4xl leading-tight text-charcoal sm:text-6xl">
            Grown, not mined. Real diamonds.
            <br className="hidden sm:block" /> Zero compromise.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground">
            Brilliant, certified lab-grown diamonds and fine jewellery — without the
            environmental destruction or human cost of mining.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/diamonds" className={cn(buttonVariants({ size: "lg" }))}>
              Shop diamonds
            </Link>
            <Link
              href="/shop?occasion=engagement"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Engagement rings
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v) => (
            <div key={v.title} className="border-border px-6 py-10 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0">
              <h2 className="font-serif text-xl text-charcoal">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
