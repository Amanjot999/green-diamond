import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="h-4 w-40 animate-pulse rounded bg-foreground/10" />
      <div className="mt-5 h-10 w-80 max-w-full animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr]">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-foreground/10" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-square animate-pulse rounded-lg bg-foreground/10" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-foreground/10" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
