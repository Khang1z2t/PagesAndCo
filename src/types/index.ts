export type BookBadge = "BESTSELLER" | "NEW";

export type BookGenre =
  | "Fiction"
  | "Mystery"
  | "Sci-Fi"
  | "Poetry"
  | "Children"
  | "Non-fiction"
  | "Biography";

export type BookCollection = "featured" | "bestseller" | "new-arrival";

export type BookSortValue =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "title-asc";

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  pages: number;
  year: number;
  genre: BookGenre;
  coverColor: string;
  badge?: BookBadge;
  description: string;
  format: string;
  publisher: string;
  language: string;
  isbn: string;
  collections: BookCollection[];
}

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface Genre {
  name: BookGenre;
  slug: string;
  color: string;
  count: number;
  featuredOnHome?: boolean;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export interface SortOption {
  label: string;
  value: BookSortValue;
}
