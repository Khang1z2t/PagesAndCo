import Link from "next/link";
import { BookFilters } from "@/components/sections/BookFilters";
import { BookGrid } from "@/components/sections/BookGrid";
import { books } from "@/data/books";
import { genres } from "@/data/genres";
import { SORT_OPTIONS } from "@/lib/constants";
import type { Book, BookSortValue, Genre } from "@/types";

type BooksPageSearchParams = Promise<{
  genre?: string | string[];
  query?: string | string[];
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

function getActiveQuery(value: string | undefined) {
  return value?.trim() ?? "";
}

function matchesBookQuery(book: Book, query: string) {
  const normalizedQuery = query.toLocaleLowerCase();

  return [book.title, book.author].some((field) => field.toLocaleLowerCase().includes(normalizedQuery));
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
  const requestedQuery = getSingleValue(resolvedSearchParams.query);
  const requestedSort = getSingleValue(resolvedSearchParams.sort);

  const activeGenre = getActiveGenre(requestedGenre, genres);
  const activeQuery = getActiveQuery(requestedQuery);
  const activeSort = getActiveSort(requestedSort);
  const activeGenreRecord = genres.find((genre) => genre.slug === activeGenre);

  const booksByGenre = activeGenreRecord ? books.filter((book) => book.genre === activeGenreRecord.name) : books;
  const filteredBooks = activeQuery ? booksByGenre.filter((book) => matchesBookQuery(book, activeQuery)) : booksByGenre;
  const sortedBooks = sortBooks(filteredBooks, activeSort);
  const activeGenreName = activeGenreRecord?.name;
  const resultLabel = activeQuery ? `Results for “${activeQuery}”` : null;

  const clearSearchParams = new URLSearchParams();

  if (activeGenre) {
    clearSearchParams.set("genre", activeGenre);
  }

  if (activeSort !== "featured") {
    clearSearchParams.set("sort", activeSort);
  }

  const clearSearchHref = clearSearchParams.size > 0 ? `/books?${clearSearchParams.toString()}` : "/books";
  const browseAllHref = activeSort === "featured" ? "/books" : `/books?sort=${activeSort}`;

  return (
    <section className="pt-4 pb-[var(--section-gap)] sm:pt-5">
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
            <div className="space-y-2">
              <p className="text-base text-[var(--color-muted)] sm:text-lg">
                {sortedBooks.length} {sortedBooks.length === 1 ? "title" : "titles"} in the collection
              </p>
              {resultLabel ? (
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-charcoal)] sm:text-base">
                  <span>{resultLabel}</span>
                  <Link
                    href={clearSearchHref}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-[var(--color-charcoal)] transition hover:border-[var(--color-gold)] hover:bg-white/80"
                  >
                    Clear search
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <BookFilters
          genres={genres}
          sortOptions={SORT_OPTIONS}
          activeGenre={activeGenre}
          activeSort={activeSort}
          activeQuery={activeQuery}
        />

        <BookGrid books={sortedBooks} clearHref={activeQuery ? browseAllHref : clearSearchHref} hasSearchQuery={Boolean(activeQuery)} />
      </div>
    </section>
  );
}
