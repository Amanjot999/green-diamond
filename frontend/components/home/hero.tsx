import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sage-50 via-background to-background" />
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start">
          <Badge variant="gold" className="animate-fade-in">
            Lab-grown · IGI / GIA certified
          </Badge>
          <h1 className="mt-6 max-w-xl animate-fade-up font-serif text-5xl leading-[1.05] text-charcoal sm:text-6xl">
            Grown, not mined. Real diamonds. Zero compromise.
          </h1>
          <p className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-muted-foreground">
            Brilliant, certified lab-grown diamonds and fine jewellery — chemically
            identical to mined, conflict-free, and 30–50% better value.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
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
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sage-100 shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=1600&auto=format&fit=crop"
              alt="Fine gold and diamond jewellery worn in soft daylight"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-lg bg-surface px-4 py-3 shadow-card">
            <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <div className="text-sm">
              <p className="font-medium text-charcoal">Independently certified</p>
              <p className="text-xs text-muted-foreground">IGI · GIA · GCAL</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
