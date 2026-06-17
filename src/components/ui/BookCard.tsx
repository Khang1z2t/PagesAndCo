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
      className="group block rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
    >
      <article className="h-full transition duration-200 group-hover:-translate-y-1">
        <div
          className="relative aspect-[4/5.45] overflow-hidden rounded-[1.35rem] p-5 text-white shadow-[0_18px_34px_rgba(30,28,24,0.16)] transition duration-200 group-hover:shadow-[var(--shadow-card-hover)]"
          style={{ backgroundColor: book.coverColor }}
        >
          <div className="absolute inset-y-5 left-0 w-2 rounded-r-full bg-white/18" />
          <div className="absolute inset-x-5 top-5 flex justify-between gap-3">
            {book.badge ? <Badge label={book.badge} /> : <span />}
            <span className="rounded-full border border-white/22 bg-white/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/84">
              {book.genre}
            </span>
          </div>
          <div className="flex h-full flex-col justify-end pt-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Pages & Co
            </p>
            <h3 className="font-serif text-2xl leading-[1.05] tracking-[-0.03em] text-white sm:text-[1.7rem]">
              {book.title}
            </h3>
            <p className="mt-3 text-sm font-medium text-white/78">{book.author}</p>
          </div>
        </div>

        <div className="space-y-2 px-1 pt-4">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[var(--color-text)] transition group-hover:text-[var(--color-crimson)]">
              {book.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{book.author}</p>
          </div>

          <div className="flex items-center justify-between gap-3">
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
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-charcoal)]">
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
