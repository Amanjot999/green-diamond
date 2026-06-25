import { percentOf, type Paise } from "./money";

/**
 * GST as a CONFIGURABLE tax rule — never hardcode the rate as if it were
 * settled law (SPEC §8, §10). The effective rate is supplied from config/env
 * (`GST_RATE_PERCENT`). The constant below is only a build-time default.
 *
 * TODO(tax): verify the current GST rate and HSN classification for lab-grown
 * diamonds & jewellery with a tax advisor before go-live. The commonly cited
 * rate for gems & jewellery has historically been 3% — do not treat as final.
 */
export const DEFAULT_GST_RATE_PERCENT = 3;

export interface TaxRule {
  ratePercent: number;
  label: string;
}

export function getTaxRule(ratePercent: number = DEFAULT_GST_RATE_PERCENT): TaxRule {
  return { ratePercent, label: `GST (${ratePercent}%)` };
}

/** Tax payable on a taxable amount (paise), rounded to the nearest paise. */
export function computeTax(taxableAmount: Paise, rule: TaxRule): Paise {
  return percentOf(taxableAmount, rule.ratePercent);
}
