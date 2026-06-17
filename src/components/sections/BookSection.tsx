import Link from "next/link";
import { BookCard } from "@/components/ui/BookCard";
import type { Book } from "@/types";

interface BookSectionProps {
  eyebrow: string;
  title: string;
  href: string;
  books: Book[];
}

export function BookSection({ eyebrow, title, href, books }: BookSectionProps) {
  return (
    <section className="section-gap">
      <div className="page-shell space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="section-heading text-[var(--color-charcoal)]">{title}</h2>
          </div>
          <Link
            href={href}
            className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-charcoal)] shadow-sm transition hover:border-[var(--color-gold)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
          >
            View all
          </Link>
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
