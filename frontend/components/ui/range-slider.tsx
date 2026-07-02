"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

// Two overlaid native <input type="range"> thumbs: keyboard-accessible for
// free, with pointer events limited to the thumbs so they don't fight.
const RANGE_INPUT = cn(
  "pointer-events-none absolute inset-x-0 top-1/2 h-11 w-full -translate-y-1/2 appearance-none bg-transparent outline-none",
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-sm",
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface",
  "focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-ring",
);

/**
 * Accessible dual-thumb range slider (SPEC §7.3 finder sliders).
 * Drags update locally; commits are debounced (or immediate on release) so the
 * URL/router isn't spammed. Committing min/max at their bounds clears them.
 */
export function RangeSlider({
  label,
  min,
  max,
  step,
  valueMin,
  valueMax,
  format,
  onCommit,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  valueMin?: number;
  valueMax?: number;
  format: (v: number) => string;
  onCommit: (lo: number | undefined, hi: number | undefined) => void;
}) {
  const [lo, setLo] = useState(valueMin ?? min);
  const [hi, setHi] = useState(valueMax ?? max);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Re-sync local thumbs when the committed (URL-driven) values change from
  // outside — e.g. an active-filter chip or "Clear all". State adjustment
  // during render, per react.dev "adjusting state when a prop changes".
  const [synced, setSynced] = useState({ valueMin, valueMax, min, max });
  if (
    synced.valueMin !== valueMin ||
    synced.valueMax !== valueMax ||
    synced.min !== min ||
    synced.max !== max
  ) {
    setSynced({ valueMin, valueMax, min, max });
    setLo(valueMin ?? min);
    setHi(valueMax ?? max);
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function commit(nextLo: number, nextHi: number, delay: number) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onCommit(nextLo <= min ? undefined : nextLo, nextHi >= max ? undefined : nextHi);
    }, delay);
  }

  const changeLo = (v: number) => {
    const next = Math.min(v, hi - step);
    setLo(next);
    commit(next, hi, 500);
  };
  const changeHi = (v: number) => {
    const next = Math.max(v, lo + step);
    setHi(next);
    commit(lo, next, 500);
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="text-sm text-charcoal">
          {format(lo)} – {format(hi)}
        </span>
      </div>
      <div className="relative mt-1 h-11">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" aria-hidden />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
          aria-hidden
        />
        <input
          type="range"
          aria-label={`Minimum ${label.toLowerCase()}`}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => changeLo(Number(e.target.value))}
          onPointerUp={() => commit(lo, hi, 0)}
          className={cn(RANGE_INPUT, pct(lo) > 50 ? "z-30" : "z-20")}
        />
        <input
          type="range"
          aria-label={`Maximum ${label.toLowerCase()}`}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => changeHi(Number(e.target.value))}
          onPointerUp={() => commit(lo, hi, 0)}
          className={cn(RANGE_INPUT, "z-20")}
        />
      </div>
    </div>
  );
}
