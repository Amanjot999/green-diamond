import { Star } from "lucide-react";
import type { Review } from "@backend/types";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";

function StarRow({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= Math.round(value) ? "fill-gold-500 text-gold-500" : "fill-none text-border",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </span>
  );
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** PDP reviews (SPEC §7.4). Writing a review arrives with auth in Phase 2. */
export function Reviews({
  rating,
  count,
  reviews,
  className,
}: {
  rating?: number;
  count?: number;
  reviews: Review[];
  className?: string;
}) {
  return (
    <section aria-labelledby="reviews-heading" className={className}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
        <div>
          <h2 id="reviews-heading" className="font-serif text-2xl text-charcoal sm:text-3xl">
            Customer reviews
          </h2>
          {rating !== undefined && count !== undefined && count > 0 ? (
            <div className="mt-4 flex items-center gap-4 lg:flex-col lg:items-start">
              <p className="font-serif text-5xl leading-none text-charcoal">{rating.toFixed(1)}</p>
              <div className="flex flex-col gap-1">
                <StarRow value={rating} />
                <p className="text-xs text-muted-foreground">Based on {count} reviews</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">No reviews yet for this piece.</p>
          )}
        </div>

        <div>
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No written reviews yet — be the first once accounts launch.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {reviews.map((review) => (
                <li key={review.id} className="py-5 first:pt-0 last:pb-0">
                  <article>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <StarRow value={review.rating} />
                      {review.verifiedPurchase && (
                        <Badge variant="outline" className="border-success/40 text-success">
                          Verified purchase
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-2 font-sans text-sm font-semibold text-charcoal">
                      {review.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {review.body}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {review.author} · {formatDate(review.date)}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
          {count !== undefined && reviews.length > 0 && reviews.length < count && (
            <p className="mt-4 text-xs text-muted-foreground">
              Showing the {reviews.length} most recent written {reviews.length === 1 ? "review" : "reviews"}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
