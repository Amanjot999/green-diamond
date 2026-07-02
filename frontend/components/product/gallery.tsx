"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@backend/types";
import { cn } from "@/lib/utils/cn";

const FALLBACK: MediaItem = {
  id: "fallback",
  url: "/images/placeholder.svg",
  alt: "",
  type: "image",
  position: 0,
};

/**
 * PDP media gallery (SPEC §7.4). Large primary image with tappable thumbnails —
 * a row under the image on mobile, a column beside it on desktop.
 * TODO(phase-6): video / 360° spins + zoom once real imagery lands.
 */
export function Gallery({ media, productName }: { media: MediaItem[]; productName: string }) {
  const items = media.length > 0 ? [...media].sort((a, b) => a.position - b.position) : [FALLBACK];
  const [index, setIndex] = useState(0);
  const active = items[Math.min(index, items.length - 1)];

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:items-start lg:gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-sage-50 lg:flex-1">
        <Image
          src={active.url}
          alt={active.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover"
        />
      </div>

      {items.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1 lg:w-20 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Product images"
        >
          {items.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1} of ${items.length}`}
              aria-current={i === index}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-sage-50 transition-colors sm:h-20 sm:w-20",
                i === index ? "border-primary" : "border-border hover:border-primary/40",
              )}
            >
              <Image src={m.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
