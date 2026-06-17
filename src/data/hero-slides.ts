import type { HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "staff-favourites",
    eyebrow: "Staff favourites",
    title: "The shelves we keep coming back to",
    description:
      "Thoughtful fiction, quiet mysteries, and the kind of books that linger long after the last page.",
    ctaLabel: "Browse bestsellers",
    ctaHref: "/books?sort=featured",
  },
  {
    id: "slow-afternoons",
    eyebrow: "For slow afternoons",
    title: "Stories to stretch a rainy weekend",
    description:
      "Settle in with character-led novels, luminous essays, and poetry collections made for unhurried reading.",
    ctaLabel: "Shop fiction",
    ctaHref: "/books?genre=fiction",
  },
  {
    id: "fresh-finds",
    eyebrow: "Fresh finds",
    title: "New arrivals for your nightstand",
    description:
      "A just-in set of debut voices, family favourites, and beautifully bound hardcovers ready for gifting.",
    ctaLabel: "See new arrivals",
    ctaHref: "/books?sort=newest",
  },
];
