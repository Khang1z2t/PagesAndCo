import { BookCard } from "@/components/ui/BookCard";
import type { Book } from "@/types";

interface RelatedBooksProps {
  title?: string;
  books: Book[];
}

export function RelatedBooks({ title = "More to discover", books }: RelatedBooksProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="pb-[var(--section-gap)] pt-14 sm:pt-16">
      <div className="page-shell space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="section-eyebrow">Keep browsing</p>
            <h2 className="section-heading text-[var(--color-charcoal)]">{title}</h2>
            <p className="text-base text-[var(--color-muted)] sm:text-lg">
              More books with the same unhurried, hand-picked feel.
            </p>
          </div>
        </div>

        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
