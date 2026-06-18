import Link from "next/link";
import { BookFilters } from "@/components/sections/BookFilters";
import { BookGrid } from "@/components/sections/BookGrid";
import { books } from "@/data/books";
import { genres } from "@/data/genres";
import { SORT_OPTIONS } from "@/lib/constants";
import type { Book, BookSortValue, Genre } from "@/types";

type BooksPageSearchParams = Promise<{
  genre?: string | string[];
  sort?: string | string[];
}>;

interface BooksPageProps {
  searchParams: BooksPageSearchParams;
}

const VALID_SORT_VALUES = new Set<BookSortValue>(SORT_OPTIONS.map((option) => option.value));

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getActiveGenre(value: string | undefined, availableGenres: Genre[]) {
  if (!value) {
    return undefined;
  }

  return availableGenres.find((genre) => genre.slug === value)?.slug;
}

function getActiveSort(value: string | undefined): BookSortValue {
  if (value && VALID_SORT_VALUES.has(value as BookSortValue)) {
    return value as BookSortValue;
  }

  return "featured";
}

function sortBooks(collection: Book[], sort: BookSortValue) {
  const sortedBooks = [...collection];

  switch (sort) {
    case "newest":
      return sortedBooks.sort((left, right) => right.year - left.year || left.title.localeCompare(right.title));
    case "price-asc":
      return sortedBooks.sort((left, right) => left.price - right.price || left.title.localeCompare(right.title));
    case "price-desc":
      return sortedBooks.sort((left, right) => right.price - left.price || left.title.localeCompare(right.title));
    case "rating-desc":
      return sortedBooks.sort((left, right) => right.rating - left.rating || left.title.localeCompare(right.title));
    case "title-asc":
      return sortedBooks.sort((left, right) => left.title.localeCompare(right.title));
    case "featured":
    default:
      return sortedBooks.sort((left, right) => {
        const leftFeatured = Number(left.collections.includes("featured"));
        const rightFeatured = Number(right.collections.includes("featured"));
        const leftBestseller = Number(left.collections.includes("bestseller"));
        const rightBestseller = Number(right.collections.includes("bestseller"));
        const leftNewArrival = Number(left.collections.includes("new-arrival"));
        const rightNewArrival = Number(right.collections.includes("new-arrival"));

        return (
          rightFeatured - leftFeatured ||
          rightBestseller - leftBestseller ||
          rightNewArrival - leftNewArrival ||
          right.rating - left.rating ||
          right.year - left.year ||
          left.title.localeCompare(right.title)
        );
      });
  }
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedGenre = getSingleValue(resolvedSearchParams.genre);
  const requestedSort = getSingleValue(resolvedSearchParams.sort);

  const activeGenre = getActiveGenre(requestedGenre, genres);
  const activeSort = getActiveSort(requestedSort);
  const activeGenreRecord = genres.find((genre) => genre.slug === activeGenre);

  const filteredBooks = activeGenreRecord
    ? books.filter((book) => book.genre === activeGenreRecord.name)
    : books;
  const sortedBooks = sortBooks(filteredBooks, activeSort);
  const activeGenreName = activeGenreRecord?.name;

  return (
    <section className="pt-8 pb-[var(--section-gap)] sm:pt-10">
      <div className="page-shell space-y-8">
        <div className="space-y-5">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[var(--color-charcoal)]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-charcoal)]">Books</span>
          </nav>

          <div className="space-y-3">
            <p className="section-eyebrow">Shop all</p>
            <h1 className="section-heading text-[var(--color-charcoal)]">
              {activeGenreName ? `${activeGenreName} books` : "All books"}
            </h1>
            <p className="text-base text-[var(--color-muted)] sm:text-lg">
              {sortedBooks.length} {sortedBooks.length === 1 ? "title" : "titles"} in the collection
            </p>
          </div>
        </div>

        <BookFilters genres={genres} sortOptions={SORT_OPTIONS} activeGenre={activeGenre} activeSort={activeSort} />

        <BookGrid books={sortedBooks} />
      </div>
    </section>
  );
}
