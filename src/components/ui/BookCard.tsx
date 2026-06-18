import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
    >
      <article className="flex h-full flex-col rounded-md border border-black/15 bg-white p-3 shadow-[0_10px_26px_rgba(30,28,24,0.06)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)]">
        <div
          className="relative aspect-[4/5.45] overflow-hidden rounded-md border border-black/10 p-5 text-white shadow-[0_18px_34px_rgba(30,28,24,0.16)] transition duration-200"
          style={{ backgroundColor: book.coverColor }}
        >
          <div className="absolute inset-y-5 left-0 w-2 rounded-r-full bg-white/18" />
          <div className="absolute inset-x-5 top-5 flex justify-start gap-3">
            {book.badge ? <Badge label={book.badge} className="rounded-md" /> : null}
          </div>
          <div className="flex h-full flex-col justify-end pt-16">
            <h3 className="max-w-[8.5ch] font-serif text-[1.55rem] leading-[1.02] tracking-[-0.03em] text-white [overflow-wrap:anywhere] sm:text-[1.4rem]">
              {book.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-white/78">{book.author}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-4">
          <div className="space-y-1.5 border-t border-black/8 pt-3">
            <h3 className="text-base font-semibold leading-snug text-[var(--color-text)] transition group-hover:text-[var(--color-crimson)] [overflow-wrap:anywhere]">
              {book.title}
            </h3>
            <p className="text-sm text-[var(--color-muted)]">{book.author}</p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]/80">
              {book.genre}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-base font-bold text-[var(--color-price)]">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice ? (
                <span className="text-sm text-[var(--color-strikethrough)] line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              ) : null}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--color-charcoal)]">
              <span aria-hidden="true" className="text-[var(--color-gold)]">
                ★
              </span>
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
