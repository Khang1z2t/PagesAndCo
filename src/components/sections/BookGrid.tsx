import { BookCard } from "@/components/ui/BookCard";
import type { Book } from "@/types";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-black/15 bg-white/45 px-6 py-16 text-center">
        <p className="font-serif text-3xl text-[var(--color-charcoal)]">No books found</p>
        <p className="mt-3 text-base text-[var(--color-muted)]">
          Try another shelf or switch the sort to see more of the collection.
        </p>
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
