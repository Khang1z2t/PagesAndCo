import Link from "next/link";
import { BookCard } from "@/components/ui/BookCard";
import type { Book } from "@/types";

interface BookGridProps {
  books: Book[];
  clearHref?: string;
  hasSearchQuery?: boolean;
}

export function BookGrid({ books, clearHref = "/books", hasSearchQuery = false }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-black/15 bg-white/45 px-6 py-16 text-center shadow-sm">
        <p className="font-serif text-3xl text-[var(--color-charcoal)]">No books found</p>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          {hasSearchQuery
            ? "Try a different title or author, or browse every book in the shop."
            : "Try another shelf or switch the sort to see more of the collection."}
        </p>
        {hasSearchQuery ? (
          <Link
            href={clearHref}
            className="mt-6 inline-flex items-center rounded-full !text-white bg-[var(--color-crimson)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
          >
            Browse all books
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
