import { Container } from "@/components/ui/container";

/** Skeleton for the diamond finder while results resolve. */
export default function DiamondsLoading() {
  return (
    <Container className="py-8 sm:py-12" aria-busy="true" aria-label="Loading diamonds">
      <div className="h-4 w-44 animate-pulse rounded bg-sage-100" />
      <div className="mt-5 h-10 w-72 animate-pulse rounded bg-sage-100" />
      <div className="mt-3 h-4 w-80 animate-pulse rounded bg-sage-100" />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
        <div className="hidden flex-col gap-4 lg:flex">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-sage-100" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-12 animate-pulse rounded-xl bg-sage-100 lg:hidden" />
          <div className="h-9 w-full animate-pulse rounded bg-sage-100" />
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-sage-100" />
          ))}
        </div>
      </div>
    </Container>
  );
}
