import { BookSection } from "@/components/sections/BookSection";
import { GenreGrid } from "@/components/sections/GenreGrid";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { books } from "@/data/books";
import { genres } from "@/data/genres";
import { heroSlides } from "@/data/hero-slides";
import { HOME_SECTION_LIMITS } from "@/lib/constants";

export default function Home() {
  const featuredBooks = books
    .filter((book) => book.collections.includes("featured"))
    .slice(0, HOME_SECTION_LIMITS.featured);
  const bestsellerBooks = books
    .filter((book) => book.collections.includes("bestseller"))
    .slice(0, HOME_SECTION_LIMITS.bestsellers);
  const newArrivalBooks = books
    .filter((book) => book.collections.includes("new-arrival"))
    .slice(0, HOME_SECTION_LIMITS.newArrivals);
  const homeGenres = genres.filter((genre) => genre.featuredOnHome).slice(0, 6);

  return (
    <>
      <HeroBanner slides={heroSlides} />
      <GenreGrid genres={homeGenres} />
      <BookSection
        eyebrow="Featured this month"
        title="Books the shop is talking about."
        href="/books?sort=featured"
        books={featuredBooks}
      />
      <PromoBanner />
      <BookSection
        eyebrow="Bestsellers"
        title="The titles leaving with the most readers."
        href="/books?sort=featured"
        books={bestsellerBooks}
      />
      <BookSection
        eyebrow="New arrivals"
        title="Fresh on the tables this week."
        href="/books?sort=newest"
        books={newArrivalBooks}
      />
    </>
  );
}
