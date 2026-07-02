"use client";

import { useState } from "react";
import {
  CLARITY_OPTIONS,
  COLOR_OPTIONS,
  CUT_OPTIONS,
  GROWTH_OPTIONS,
  METAL_OPTIONS,
  SHAPE_OPTIONS,
  TYPE_OPTIONS,
} from "@backend/shop/facets";
import { cn } from "@/lib/utils/cn";
import { useShopParams } from "./use-shop-params";

function FilterBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {heading}
      </h3>
      {children}
    </div>
  );
}

function PillGroup({
  paramKey,
  options,
}: {
  paramKey: string;
  options: { value: string; label: string }[];
}) {
  const { searchParams, toggleParam } = useShopParams();
  const current = searchParams.get(paramKey);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = current === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => toggleParam(paramKey, o.value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/80 hover:border-primary hover:text-primary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function RangeBlock({
  heading,
  minKey,
  maxKey,
  prefix,
  suffix,
  step,
}: {
  heading: string;
  minKey: string;
  maxKey: string;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  const { searchParams, setMany } = useShopParams();
  const [min, setMin] = useState(searchParams.get(minKey) ?? "");
  const [max, setMax] = useState(searchParams.get(maxKey) ?? "");

  return (
    <FilterBlock heading={heading}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {prefix && (
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {prefix}
            </span>
          )}
          <input
            type="number"
            inputMode="decimal"
            step={step}
            aria-label={`${heading} minimum`}
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            className={cn(
              "h-10 w-full rounded-md border border-border bg-surface pr-2 text-sm outline-none focus-visible:border-primary",
              prefix ? "pl-6" : "pl-2.5",
            )}
          />
        </div>
        <span className="text-muted-foreground">–</span>
        <div className="relative flex-1">
          {prefix && (
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {prefix}
            </span>
          )}
          <input
            type="number"
            inputMode="decimal"
            step={step}
            aria-label={`${heading} maximum`}
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
            className={cn(
              "h-10 w-full rounded-md border border-border bg-surface pr-2 text-sm outline-none focus-visible:border-primary",
              prefix ? "pl-6" : "pl-2.5",
            )}
          />
        </div>
      </div>
      {suffix && <p className="mt-1 text-xs text-muted-foreground">{suffix}</p>}
      <button
        type="button"
        onClick={() => setMany({ [minKey]: min || null, [maxKey]: max || null })}
        className="mt-3 h-9 w-full rounded-md border border-primary/30 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
      >
        Apply
      </button>
    </FilterBlock>
  );
}

export function FilterSidebar() {
  return (
    <div className="text-sm">
      <FilterBlock heading="Category">
        <PillGroup paramKey="type" options={TYPE_OPTIONS} />
      </FilterBlock>
      <FilterBlock heading="Shape">
        <PillGroup paramKey="shape" options={SHAPE_OPTIONS} />
      </FilterBlock>
      <RangeBlock heading="Price (₹)" minKey="priceMin" maxKey="priceMax" prefix="₹" />
      <RangeBlock heading="Carat" minKey="caratMin" maxKey="caratMax" step="0.1" suffix="Total carat weight" />
      <FilterBlock heading="Cut">
        <PillGroup paramKey="cut" options={CUT_OPTIONS.map((c) => ({ value: c, label: c }))} />
      </FilterBlock>
      <FilterBlock heading="Colour">
        <PillGroup paramKey="color" options={COLOR_OPTIONS.map((c) => ({ value: c, label: c }))} />
      </FilterBlock>
      <FilterBlock heading="Clarity">
        <PillGroup paramKey="clarity" options={CLARITY_OPTIONS.map((c) => ({ value: c, label: c }))} />
      </FilterBlock>
      <FilterBlock heading="Metal">
        <PillGroup paramKey="metal" options={METAL_OPTIONS} />
      </FilterBlock>
      <FilterBlock heading="Grown by">
        <PillGroup paramKey="growth" options={GROWTH_OPTIONS} />
      </FilterBlock>
    </div>
  );
}
