import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import type { Book } from "@/types";

interface CartItemProps {
  book: Book;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({ book, quantity, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const lineTotal = book.price * quantity;

  return (
    <article className="rounded-md border border-black/10 bg-white/85 p-4 shadow-[0_12px_30px_rgba(30,28,24,0.06)] sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Link
          href={`/books/${book.slug}`}
          className="group shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
        >
          <div
            className="relative h-48 w-full overflow-hidden rounded-md border border-black/10 p-4 text-white shadow-[0_18px_34px_rgba(30,28,24,0.16)] sm:w-36"
            style={{ backgroundColor: book.coverColor }}
          >
            <div className="absolute inset-y-4 left-0 w-2 rounded-r-full bg-white/16" />
            <div className="absolute inset-x-4 top-4 flex justify-start">
              {book.badge ? <Badge label={book.badge} className="rounded-md" /> : null}
            </div>
            <div className="flex h-full flex-col justify-end pt-12">
              <h2 className="font-serif text-xl leading-tight tracking-[-0.03em] text-white transition group-hover:text-white/90 sm:text-lg">
                {book.title}
              </h2>
              <p className="mt-2 text-xs font-medium text-white/78">{book.author}</p>
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col justify-between gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  <span>{book.genre}</span>
                  <span aria-hidden="true">•</span>
                  <span>{book.format}</span>
                </div>
                <Link
                  href={`/books/${book.slug}`}
                  className="block font-serif text-2xl leading-tight tracking-[-0.03em] text-[var(--color-charcoal)] transition hover:text-[var(--color-crimson)]"
                >
                  {book.title}
                </Link>
                <p className="text-sm text-[var(--color-muted)]">by {book.author}</p>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{book.description}</p>
            </div>

            <div className="space-y-1 lg:text-right">
              <div className="flex flex-wrap items-baseline gap-2 lg:justify-end">
                <span className="text-lg font-bold text-[var(--color-price)]">${book.price.toFixed(2)}</span>
                {book.originalPrice ? (
                  <span className="text-sm text-[var(--color-strikethrough)] line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-[var(--color-muted)]">Line total ${lineTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <QuantityStepper quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold text-[var(--color-charcoal)] transition hover:border-[var(--color-gold)] hover:bg-white/70"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
