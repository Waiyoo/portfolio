export interface NavItem {
  label: string;
  href: string;
  iconName?: string;
  isExternal?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export const FEATURED_CASE_STUDIES: NavItem[] = [
  { label: "Riithis Clothing", href: "/projects/riithis-clothing" },
  { label: "Quant Form Engine", href: "/projects/quant-form" },
  { label: "Maxi's Garage", href: "/projects/maxis-garage" },
];

export const SYSTEM_META = {
  author: "Nickson Muriithi",
  role: "Software Developer",
  subRole: "Systems & Full-Stack Development",
  availabilityStatus: "AVAILABLE_FOR_CONTRACTS",
  ctaText: "Let's Build Something",
  ctaHref: "/start-project",
  // The email already used by the portfolio's site configuration. A WhatsApp
  // number is intentionally environment-configured rather than embedded in UI.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@riithis.dev",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254799357038",
};
