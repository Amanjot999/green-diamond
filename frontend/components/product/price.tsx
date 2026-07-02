import { formatINR, type Paise } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";

export function Price({
  price,
  compareAt,
  className,
}: {
  price: Paise;
  compareAt?: Paise;
  className?: string;
}) {
  const onSale = compareAt !== undefined && compareAt > price;
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className="font-medium text-charcoal">{formatINR(price)}</span>
      {onSale && (
        <span className="text-sm text-muted-foreground line-through">{formatINR(compareAt)}</span>
      )}
    </span>
  );
}
