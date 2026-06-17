import type { FooterGroup, NavLink, SortOption } from "@/types";

export const SITE_NAME = "Pages & Co";
export const SITE_DESCRIPTION =
  "An independent bookshop for readers who like to take their time.";
export const FREE_SHIPPING_THRESHOLD = 35;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/books" },
  { label: "Fiction", href: "/books?genre=fiction" },
  { label: "Mystery", href: "/books?genre=mystery" },
  { label: "Children", href: "/books?genre=children" },
  { label: "Poetry", href: "/books?genre=poetry" },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/books?sort=newest" },
      { label: "Bestsellers", href: "/books?sort=featured" },
      { label: "Fiction", href: "/books?genre=fiction" },
      { label: "Children", href: "/books?genre=children" },
      { label: "Gift cards", href: "/bag" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "/#our-story" },
      { label: "Events", href: "/#events" },
      { label: "Visit the shop", href: "/#visit" },
      { label: "Journal", href: "/#journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/#shipping" },
      { label: "Returns", href: "/#returns" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "New arrivals", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest rated", value: "rating-desc" },
  { label: "Title: A to Z", value: "title-asc" },
];

export const HOME_SECTION_LIMITS = {
  featured: 5,
  bestsellers: 4,
  newArrivals: 4,
} as const;
