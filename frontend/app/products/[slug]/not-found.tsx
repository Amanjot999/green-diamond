import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function ProductNotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <EmptyState
        title="This piece isn't available"
        description="It may have just sold — many of our stones are one of a kind. Explore the collection for something similar."
        actionHref="/shop"
        actionLabel="Back to the shop"
      />
    </Container>
  );
}
