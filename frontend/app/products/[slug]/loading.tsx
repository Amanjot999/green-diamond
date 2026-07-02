import { Container } from "@/components/ui/container";

/** Skeleton for the PDP while product data resolves. */
export default function ProductLoading() {
  return (
    <Container className="pb-28 pt-6 sm:pt-8 lg:pb-16" aria-busy="true" aria-label="Loading product">
      <div className="h-4 w-52 animate-pulse rounded bg-sage-100" />
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="aspect-square w-full animate-pulse rounded-xl bg-sage-100" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-24 animate-pulse rounded-full bg-sage-100" />
          <div className="h-10 w-4/5 animate-pulse rounded bg-sage-100" />
          <div className="h-5 w-32 animate-pulse rounded bg-sage-100" />
          <div className="h-8 w-44 animate-pulse rounded bg-sage-100" />
          <div className="h-20 w-full animate-pulse rounded bg-sage-100" />
          <div className="h-11 w-2/3 animate-pulse rounded bg-sage-100" />
          <div className="h-12 w-full animate-pulse rounded-md bg-sage-100" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-sage-100" />
        ))}
      </div>
    </Container>
  );
}
