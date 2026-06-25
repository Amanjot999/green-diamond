"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** id of the element that labels the dialog (e.g. its title heading). */
  labelledBy?: string;
  /** Accessible name used when there is no visible title to reference. */
  label?: string;
  className?: string;
}

/**
 * Accessible centred dialog (SPEC §3 a11y). Portals to <body>, traps focus,
 * locks scroll, closes on Escape / backdrop click, and restores focus to the
 * trigger on close. Animations are gated by the global prefers-reduced-motion
 * rule in globals.css.
 */
export function Modal({ open, onClose, children, labelledBy, label, className }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      const node = dialogRef.current;
      const first = node?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? node)?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const node = dialogRef.current;
      if (!node) return;
      const focusables = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !node.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-charcoal/50 animate-fade-in" aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-surface shadow-2xl outline-none animate-fade-up sm:max-h-[88vh] sm:rounded-2xl",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface/85 text-foreground/80 backdrop-blur transition-colors hover:bg-foreground/5"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
