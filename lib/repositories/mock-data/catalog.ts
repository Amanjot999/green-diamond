import { rupeesToPaise } from "@/config/money";
import type { Category, Product } from "@/types";

const IMG = "/images/placeholder.svg";

/** A small but realistic demo catalogue for Phase 0/1 (mock-backed). */

export const mockCategories: Category[] = [
  // Shapes
  { id: "c-round", name: "Round", slug: "round", kind: "shape" },
  { id: "c-oval", name: "Oval", slug: "oval", kind: "shape" },
  { id: "c-emerald", name: "Emerald", slug: "emerald-cut", kind: "shape" },
  { id: "c-cushion", name: "Cushion", slug: "cushion", kind: "shape" },
  { id: "c-princess", name: "Princess", slug: "princess", kind: "shape" },
  // Styles
  { id: "c-solitaire", name: "Solitaire", slug: "solitaire", kind: "style" },
  { id: "c-halo", name: "Halo", slug: "halo", kind: "style" },
  { id: "c-stud", name: "Studs", slug: "studs", kind: "style" },
  { id: "c-tennis", name: "Tennis", slug: "tennis", kind: "style" },
  // Metals
  { id: "c-14k", name: "14k Gold", slug: "14k", kind: "metal" },
  { id: "c-18k", name: "18k Gold", slug: "18k", kind: "metal" },
  { id: "c-pt", name: "Platinum", slug: "platinum", kind: "metal" },
  // Occasions
  { id: "c-engagement", name: "Engagement", slug: "engagement", kind: "occasion" },
  { id: "c-wedding", name: "Wedding", slug: "wedding", kind: "occasion" },
  { id: "c-gifting", name: "Gifting", slug: "gifting", kind: "occasion" },
  { id: "c-everyday", name: "Everyday", slug: "everyday", kind: "occasion" },
  // Collections
  { id: "c-bestsellers", name: "Bestsellers", slug: "bestsellers", kind: "collection" },
  { id: "c-new", name: "New Arrivals", slug: "new-arrivals", kind: "collection" },
  { id: "c-signature", name: "Signature", slug: "signature", kind: "collection" },
];

export const mockProducts: Product[] = [
  // ── Loose diamonds ─────────────────────────────────────────────────────────
  {
    id: "p-rd-102",
    name: "1.02ct Round Brilliant Lab Diamond",
    slug: "round-brilliant-1-02ct-e-vvs2",
    description:
      "A classic round brilliant with exceptional fire — E colour, VVS2 clarity, ideal cut. CVD-grown and IGI-certified.",
    sku: "GD-LD-RD-102",
    type: "loose_diamond",
    basePrice: rupeesToPaise(78000),
    compareAtPrice: rupeesToPaise(115000),
    currency: "INR",
    status: "active",
    featured: true,
    categorySlugs: ["round", "bestsellers"],
    media: [{ id: "m1", url: IMG, alt: "1.02ct round brilliant lab diamond", type: "image", position: 0 }],
    variants: [
      { id: "v-rd-102", productId: "p-rd-102", price: rupeesToPaise(78000), sku: "GD-LD-RD-102", stock: 1, lowStockThreshold: 1 },
    ],
    diamondSpec: {
      shape: "round", caratWeight: 1.02, cut: "Ideal", color: "E", clarity: "VVS2",
      polish: "Excellent", symmetry: "Excellent", fluorescence: "None",
      measurements: "6.45 x 6.48 x 3.99 mm", depthPct: 61.7, tablePct: 57,
      growthMethod: "CVD", certLab: "IGI", certNumber: "IGI-LG-558210394",
    },
    rating: 4.9, reviewCount: 38, createdAt: "2026-05-02T10:00:00.000Z",
  },
  {
    id: "p-ov-151",
    name: "1.51ct Oval Lab Diamond",
    slug: "oval-1-51ct-f-vs1",
    description:
      "An elongated oval that wears larger than its carat — F colour, VS1 clarity. HPHT-grown, IGI-certified.",
    sku: "GD-LD-OV-151",
    type: "loose_diamond",
    basePrice: rupeesToPaise(124000),
    compareAtPrice: rupeesToPaise(189000),
    currency: "INR",
    status: "active",
    featured: true,
    categorySlugs: ["oval", "signature"],
    media: [{ id: "m2", url: IMG, alt: "1.51ct oval lab diamond", type: "image", position: 0 }],
    variants: [
      { id: "v-ov-151", productId: "p-ov-151", price: rupeesToPaise(124000), sku: "GD-LD-OV-151", stock: 1, lowStockThreshold: 1 },
    ],
    diamondSpec: {
      shape: "oval", caratWeight: 1.51, cut: "Excellent", color: "F", clarity: "VS1",
      polish: "Excellent", symmetry: "Very Good", fluorescence: "None",
      measurements: "8.92 x 6.10 x 3.78 mm", depthPct: 62, tablePct: 58,
      growthMethod: "HPHT", certLab: "IGI", certNumber: "IGI-LG-559001277",
    },
    rating: 4.8, reviewCount: 21, createdAt: "2026-05-10T10:00:00.000Z",
  },
  {
    id: "p-cu-201",
    name: "2.01ct Cushion Lab Diamond",
    slug: "cushion-2-01ct-g-vs2",
    description:
      "A pillowy cushion cut with vintage romance and modern brilliance — G colour, VS2. CVD-grown, GIA-certified.",
    sku: "GD-LD-CU-201",
    type: "loose_diamond",
    basePrice: rupeesToPaise(198000),
    compareAtPrice: rupeesToPaise(295000),
    currency: "INR",
    status: "active",
    featured: false,
    categorySlugs: ["cushion", "signature"],
    media: [{ id: "m3", url: IMG, alt: "2.01ct cushion lab diamond", type: "image", position: 0 }],
    variants: [
      { id: "v-cu-201", productId: "p-cu-201", price: rupeesToPaise(198000), sku: "GD-LD-CU-201", stock: 1, lowStockThreshold: 1 },
    ],
    diamondSpec: {
      shape: "cushion", caratWeight: 2.01, cut: "Excellent", color: "G", clarity: "VS2",
      polish: "Excellent", symmetry: "Excellent", fluorescence: "Faint",
      measurements: "7.40 x 7.21 x 4.66 mm", depthPct: 64.6, tablePct: 60,
      growthMethod: "CVD", certLab: "GIA", certNumber: "GIA-LG-2225019847",
    },
    rating: 5, reviewCount: 12, createdAt: "2026-05-18T10:00:00.000Z",
  },
  {
    id: "p-em-071",
    name: "0.71ct Emerald-Cut Lab Diamond",
    slug: "emerald-cut-0-71ct-d-vvs1",
    description:
      "Hall-of-mirrors clarity in a step-cut emerald — D colour, VVS1, the purest grade. CVD-grown, IGI-certified.",
    sku: "GD-LD-EM-071",
    type: "loose_diamond",
    basePrice: rupeesToPaise(46000),
    compareAtPrice: rupeesToPaise(69000),
    currency: "INR",
    status: "active",
    featured: false,
    categorySlugs: ["emerald-cut", "new-arrivals"],
    media: [{ id: "m4", url: IMG, alt: "0.71ct emerald-cut lab diamond", type: "image", position: 0 }],
    variants: [
      { id: "v-em-071", productId: "p-em-071", price: rupeesToPaise(46000), sku: "GD-LD-EM-071", stock: 1, lowStockThreshold: 1 },
    ],
    diamondSpec: {
      shape: "emerald", caratWeight: 0.71, cut: "Excellent", color: "D", clarity: "VVS1",
      polish: "Excellent", symmetry: "Excellent", fluorescence: "None",
      measurements: "5.92 x 4.10 x 2.71 mm", depthPct: 66, tablePct: 62,
      growthMethod: "CVD", certLab: "IGI", certNumber: "IGI-LG-560113908",
    },
    rating: 4.7, reviewCount: 9, createdAt: "2026-06-01T10:00:00.000Z",
  },

  // ── Jewellery ──────────────────────────────────────────────────────────────
  {
    id: "p-ring-sol",
    name: "Aurora Solitaire Engagement Ring",
    slug: "aurora-solitaire-engagement-ring",
    description:
      "A timeless six-prong solitaire setting designed to showcase your centre stone. Choose your metal and size.",
    sku: "GD-RING-SOL",
    type: "ring",
    basePrice: rupeesToPaise(89000),
    currency: "INR",
    status: "active",
    featured: true,
    categorySlugs: ["solitaire", "engagement", "bestsellers"],
    media: [{ id: "m5", url: IMG, alt: "Aurora solitaire engagement ring", type: "image", position: 0 }],
    variants: [
      { id: "v-ring-18kw-12", productId: "p-ring-sol", metal: "18k", metalColor: "white", ringSize: "12", centerCarat: 1, price: rupeesToPaise(89000), sku: "GD-RING-SOL-18KW-12", stock: 5, lowStockThreshold: 2 },
      { id: "v-ring-18ky-12", productId: "p-ring-sol", metal: "18k", metalColor: "yellow", ringSize: "12", centerCarat: 1, price: rupeesToPaise(89000), sku: "GD-RING-SOL-18KY-12", stock: 4, lowStockThreshold: 2 },
      { id: "v-ring-pt-14", productId: "p-ring-sol", metal: "platinum", metalColor: "white", ringSize: "14", centerCarat: 1, price: rupeesToPaise(112000), sku: "GD-RING-SOL-PT-14", stock: 2, lowStockThreshold: 2 },
      { id: "v-ring-14kr-10", productId: "p-ring-sol", metal: "14k", metalColor: "rose", ringSize: "10", centerCarat: 1, price: rupeesToPaise(76000), sku: "GD-RING-SOL-14KR-10", stock: 6, lowStockThreshold: 2 },
    ],
    diamondSpec: {
      shape: "round", caratWeight: 1, cut: "Ideal", color: "F", clarity: "VS1",
      polish: "Excellent", symmetry: "Excellent", fluorescence: "None",
      measurements: "6.40 x 6.42 x 3.96 mm", growthMethod: "CVD", certLab: "IGI", certNumber: "IGI-LG-560778120",
    },
    rating: 4.9, reviewCount: 54, createdAt: "2026-04-20T10:00:00.000Z",
  },
  {
    id: "p-studs-halo",
    name: "Celeste Halo Stud Earrings",
    slug: "celeste-halo-stud-earrings",
    description:
      "A delicate halo of pavé brilliance surrounding two round centres — everyday sparkle that dresses up beautifully.",
    sku: "GD-EAR-HALO",
    type: "earrings",
    basePrice: rupeesToPaise(54000),
    compareAtPrice: rupeesToPaise(72000),
    currency: "INR",
    status: "active",
    featured: true,
    categorySlugs: ["halo", "studs", "gifting", "everyday", "bestsellers"],
    media: [{ id: "m6", url: IMG, alt: "Celeste halo stud earrings", type: "image", position: 0 }],
    variants: [
      { id: "v-studs-18kw", productId: "p-studs-halo", metal: "18k", metalColor: "white", price: rupeesToPaise(54000), sku: "GD-EAR-HALO-18KW", stock: 8, lowStockThreshold: 3 },
      { id: "v-studs-18ky", productId: "p-studs-halo", metal: "18k", metalColor: "yellow", price: rupeesToPaise(54000), sku: "GD-EAR-HALO-18KY", stock: 7, lowStockThreshold: 3 },
    ],
    rating: 4.8, reviewCount: 31, createdAt: "2026-05-22T10:00:00.000Z",
  },
  {
    id: "p-bracelet-tennis",
    name: "Lumen Tennis Bracelet",
    slug: "lumen-tennis-bracelet",
    description:
      "A continuous line of prong-set lab diamonds — 3.00ct total — with a secure double-lock clasp.",
    sku: "GD-BRC-TENNIS",
    type: "bracelet",
    basePrice: rupeesToPaise(145000),
    currency: "INR",
    status: "active",
    featured: false,
    categorySlugs: ["tennis", "gifting", "signature"],
    media: [{ id: "m7", url: IMG, alt: "Lumen tennis bracelet", type: "image", position: 0 }],
    variants: [
      { id: "v-brc-18kw", productId: "p-bracelet-tennis", metal: "18k", metalColor: "white", price: rupeesToPaise(145000), sku: "GD-BRC-TENNIS-18KW", stock: 3, lowStockThreshold: 2 },
    ],
    rating: 5, reviewCount: 7, createdAt: "2026-06-05T10:00:00.000Z",
  },
  {
    id: "p-pendant-solitaire",
    name: "Solène Solitaire Pendant",
    slug: "solene-solitaire-pendant",
    description:
      "A floating round solitaire on a fine cable chain — quietly luminous, day to night.",
    sku: "GD-PEN-SOL",
    type: "pendant",
    basePrice: rupeesToPaise(38000),
    compareAtPrice: rupeesToPaise(49000),
    currency: "INR",
    status: "active",
    featured: false,
    categorySlugs: ["solitaire", "everyday", "gifting", "new-arrivals"],
    media: [{ id: "m8", url: IMG, alt: "Solène solitaire pendant", type: "image", position: 0 }],
    variants: [
      { id: "v-pen-14kw", productId: "p-pendant-solitaire", metal: "14k", metalColor: "white", price: rupeesToPaise(38000), sku: "GD-PEN-SOL-14KW", stock: 10, lowStockThreshold: 3 },
      { id: "v-pen-14ky", productId: "p-pendant-solitaire", metal: "14k", metalColor: "yellow", price: rupeesToPaise(38000), sku: "GD-PEN-SOL-14KY", stock: 9, lowStockThreshold: 3 },
    ],
    rating: 4.6, reviewCount: 18, createdAt: "2026-06-12T10:00:00.000Z",
  },
];
