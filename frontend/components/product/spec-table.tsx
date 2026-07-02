import { ExternalLink } from "lucide-react";
import type { CertLab, DiamondSpec } from "@backend/types";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { ShapeIcon } from "./shape-icon";
import { capitalize } from "./product-labels";

/** Public report-check pages — used when a stone has no hosted certificate PDF. */
const CERT_VERIFY_URL: Record<CertLab, (certNumber: string) => string> = {
  IGI: (n) => `https://www.igi.org/verify-your-report/?r=${encodeURIComponent(n)}`,
  GIA: (n) => `https://www.gia.edu/report-check?reportno=${encodeURIComponent(n)}`,
  GCAL: () => "https://www.gcalusa.com/certificate-search.html",
};

/** Full diamond specification list + certificate block (SPEC §7.4). */
export function SpecTable({ spec }: { spec: DiamondSpec }) {
  const rows: { label: string; value: string }[] = [
    { label: "Shape", value: capitalize(spec.shape) },
    { label: "Carat weight", value: `${spec.caratWeight.toFixed(2)} ct` },
    { label: "Cut", value: spec.cut },
    { label: "Colour", value: spec.color },
    { label: "Clarity", value: spec.clarity },
    { label: "Polish", value: spec.polish },
    { label: "Symmetry", value: spec.symmetry },
    { label: "Fluorescence", value: spec.fluorescence },
    { label: "Measurements", value: spec.measurements },
  ];
  if (spec.depthPct !== undefined) rows.push({ label: "Depth", value: `${spec.depthPct}%` });
  if (spec.tablePct !== undefined) rows.push({ label: "Table", value: `${spec.tablePct}%` });
  rows.push({
    label: "Growth method",
    value:
      spec.growthMethod === "CVD"
        ? "CVD (chemical vapour deposition)"
        : "HPHT (high pressure, high temperature)",
  });

  const certHref = spec.certUrl ?? CERT_VERIFY_URL[spec.certLab](spec.certNumber);

  return (
    <section aria-labelledby="spec-heading">
      <h2 id="spec-heading" className="flex items-center gap-3 font-serif text-2xl text-charcoal sm:text-3xl">
        <ShapeIcon shape={spec.shape} className="h-7 w-7 text-primary" />
        Diamond specifications
      </h2>

      <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 px-4 py-3 sm:px-5">
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="text-right text-sm font-medium text-charcoal">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-gold-300/60 bg-gold-200/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-sm font-medium text-charcoal">
            {spec.certLab} certificate · {spec.certNumber}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Every stone ships with its independent lab report. Verify this one directly with{" "}
            {spec.certLab}.
          </p>
        </div>
        <a
          href={certHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-11 shrink-0 sm:h-9")}
        >
          View certificate
          <ExternalLink className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </a>
      </div>
    </section>
  );
}
