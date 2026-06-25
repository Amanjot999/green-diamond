export interface NavLink {
  label: string;
  href: string;
}
export interface NavColumn {
  heading: string;
  links: NavLink[];
}
export interface NavItem {
  label: string;
  href: string;
  columns?: NavColumn[];
}

/** Primary navigation, shared by the desktop mega-menu and the mobile drawer. */
export const mainNav: NavItem[] = [
  { label: "Engagement", href: "/shop?occasion=engagement" },
  {
    label: "Diamonds",
    href: "/diamonds",
    columns: [
      {
        heading: "By shape",
        links: [
          { label: "Round", href: "/diamonds?shape=round" },
          { label: "Oval", href: "/diamonds?shape=oval" },
          { label: "Cushion", href: "/diamonds?shape=cushion" },
          { label: "Princess", href: "/diamonds?shape=princess" },
          { label: "Emerald", href: "/diamonds?shape=emerald" },
          { label: "Pear", href: "/diamonds?shape=pear" },
        ],
      },
      {
        heading: "By price",
        links: [
          { label: "Under ₹50,000", href: "/diamonds?priceMax=50000" },
          { label: "₹50,000 – ₹1 lakh", href: "/diamonds?priceMin=50000&priceMax=100000" },
          { label: "Above ₹1 lakh", href: "/diamonds?priceMin=100000" },
        ],
      },
      {
        heading: "Learn",
        links: [
          { label: "The 4Cs", href: "/education" },
          { label: "Certification", href: "/certification" },
          { label: "How it's made", href: "/how-its-made" },
        ],
      },
    ],
  },
  {
    label: "Jewellery",
    href: "/shop",
    columns: [
      {
        heading: "Category",
        links: [
          { label: "Rings", href: "/shop?type=ring" },
          { label: "Earrings", href: "/shop?type=earrings" },
          { label: "Necklaces", href: "/shop?type=necklace" },
          { label: "Pendants", href: "/shop?type=pendant" },
          { label: "Bracelets", href: "/shop?type=bracelet" },
        ],
      },
      {
        heading: "By metal",
        links: [
          { label: "18k Gold", href: "/shop?metal=18k" },
          { label: "14k Gold", href: "/shop?metal=14k" },
          { label: "Platinum", href: "/shop?metal=platinum" },
        ],
      },
      {
        heading: "Occasion",
        links: [
          { label: "Engagement", href: "/shop?occasion=engagement" },
          { label: "Wedding", href: "/shop?occasion=wedding" },
          { label: "Gifting", href: "/shop?occasion=gifting" },
          { label: "Everyday", href: "/shop?occasion=everyday" },
        ],
      },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "Bestsellers", href: "/collections/bestsellers" },
          { label: "Signature", href: "/collections/signature" },
          { label: "New Arrivals", href: "/collections/new-arrivals" },
        ],
      },
    ],
  },
  { label: "Education", href: "/education" },
  { label: "Journal", href: "/journal" },
];
