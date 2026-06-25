/**
 * Money utilities — INR, paise-safe.
 *
 * SPEC §10: all monetary amounts are stored and computed as INTEGER paise
 * (1 INR = 100 paise) to avoid floating-point rounding errors. Only convert
 * to a float at the formatting boundary.
 */

/** An integer amount in paise. */
export type Paise = number;

export const PAISE_PER_RUPEE = 100;

export function rupeesToPaise(rupees: number): Paise {
  return Math.round(rupees * PAISE_PER_RUPEE);
}

export function paiseToRupees(paise: Paise): number {
  return paise / PAISE_PER_RUPEE;
}

/** Sum a list of paise amounts (integer-safe). */
export function sumPaise(amounts: Paise[]): Paise {
  return amounts.reduce((total, amount) => total + amount, 0);
}

/** A percentage of an amount, rounded to the nearest paise. */
export function percentOf(amount: Paise, percent: number): Paise {
  return Math.round((amount * percent) / 100);
}

/** Clamp a discount so it never exceeds the amount it applies to. */
export function clampDiscount(discount: Paise, max: Paise): Paise {
  return Math.max(0, Math.min(discount, max));
}

const inrWhole = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const inrWithPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Format paise as an Indian-Rupee string.
 * e.g. formatINR(4599900) -> "₹45,999"; formatINR(4599950, { showPaise: true }) -> "₹45,999.50".
 */
export function formatINR(paise: Paise, opts?: { showPaise?: boolean }): string {
  const rupees = paiseToRupees(paise);
  return (opts?.showPaise ? inrWithPaise : inrWhole).format(rupees);
}
