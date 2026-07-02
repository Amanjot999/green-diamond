"use client";

import { formatINR, rupeesToPaise } from "@backend/config/money";
import {
  CARAT_RANGE,
  CERT_OPTIONS,
  CLARITY_OPTIONS,
  COLOR_OPTIONS,
  CUT_OPTIONS,
  GROWTH_OPTIONS,
  PRICE_RANGE_RUPEES,
  SHAPE_OPTIONS,
} from "@backend/shop/facets";
import { cn } from "@/lib/utils/cn";
import { RangeSlider } from "@/components/ui/range-slider";
import { ShapeIcon } from "@/components/product/shape-icon";
import { useShopParams } from "@/components/shop/use-shop-params";

function PillGroup({ label, values, param }: { label: string; values: string[]; param: string }) {
  const { searchParams, toggleParam } = useShopParams();
  const current = searchParams.get(param);
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
      {values.map((value) => {
        const selected = current === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => toggleParam(param, value)}
            aria-pressed={selected}
            className={cn(
              "inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-charcoal hover:border-primary/50",
            )}
          >
            {value}
          </button>
        );
      })}
      </div>
    </fieldset>
  );
}

/** 4C finder controls (SPEC §7.3): shape, carat & price sliders, grades, cert, growth. */
export function FinderFilters() {
  const { searchParams, setMany, toggleParam } = useShopParams();
  const shape = searchParams.get("shape");
  const numParam = (key: string) => {
    const v = searchParams.get(key);
    return v === null || v === "" || Number.isNaN(Number(v)) ? undefined : Number(v);
  };

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Shape
        </legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {SHAPE_OPTIONS.map((option) => {
            const selected = shape === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleParam("shape", option.value)}
                aria-pressed={selected}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-lg border p-2 transition-colors",
                  selected
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-surface text-charcoal hover:border-primary/50",
                )}
              >
                <ShapeIcon
                  shape={option.value}
                  className={cn("h-7 w-7", selected ? "text-primary" : "text-gold-600")}
                />
                <span className="text-xs">{option.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <RangeSlider
        label="Carat"
        min={CARAT_RANGE.min}
        max={CARAT_RANGE.max}
        step={CARAT_RANGE.step}
        valueMin={numParam("caratMin")}
        valueMax={numParam("caratMax")}
        format={(v) => `${v.toFixed(2)} ct`}
        onCommit={(lo, hi) =>
          setMany({ caratMin: lo?.toFixed(2), caratMax: hi?.toFixed(2) })
        }
      />

      <RangeSlider
        label="Price"
        min={PRICE_RANGE_RUPEES.min}
        max={PRICE_RANGE_RUPEES.max}
        step={PRICE_RANGE_RUPEES.step}
        valueMin={numParam("priceMin")}
        valueMax={numParam("priceMax")}
        format={(rupees) => formatINR(rupeesToPaise(rupees))}
        onCommit={(lo, hi) => setMany({ priceMin: lo?.toString(), priceMax: hi?.toString() })}
      />

      <PillGroup label="Cut" values={CUT_OPTIONS} param="cut" />
      <PillGroup label="Colour" values={COLOR_OPTIONS} param="color" />
      <PillGroup label="Clarity" values={CLARITY_OPTIONS} param="clarity" />
      <PillGroup label="Certification" values={CERT_OPTIONS} param="cert" />
      <PillGroup label="Growth method" values={GROWTH_OPTIONS.map((o) => o.value)} param="growth" />
    </div>
  );
}
