"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import type { Book } from "@/types";

interface BookDetailProps {
  book: Book;
}

const BOOK_INFO_ITEMS = [
  { key: "format", label: "Format" },
  { key: "pages", label: "Pages" },
  { key: "publisher", label: "Publisher" },
  { key: "language", label: "Language" },
  { key: "isbn", label: "ISBN" },
  { key: "year", label: "Published" },
] as const satisfies ReadonlyArray<{
  key: keyof Pick<Book, "format" | "pages" | "publisher" | "language" | "isbn" | "year">;
  label: string;
}>;

export function BookDetail({ book }: BookDetailProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);

  return (
    <section className="pt-8 sm:pt-10">
      <div className="page-shell space-y-8">
        <div className="space-y-5">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[var(--color-charcoal)]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/books" className="transition hover:text-[var(--color-charcoal)]">
              Books
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-charcoal)]">{book.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.82fr)_minmax(360px,1fr)] xl:gap-16">
            <div className="lg:sticky lg:top-28">
              <div
                className="relative aspect-[4/5.25] overflow-hidden rounded-[1.5rem] border border-black/10 p-6 text-white shadow-[0_22px_48px_rgba(30,28,24,0.18)] sm:p-8"
                style={{ backgroundColor: book.coverColor }}
              >
                <div className="absolute inset-y-8 left-0 w-3 rounded-r-full bg-white/16" />
                <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-3 sm:inset-x-8 sm:top-8">
                  {book.badge ? <Badge label={book.badge} className="rounded-md" /> : <span />}
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-3 py-1 text-sm font-semibold text-white/92 backdrop-blur-sm">
                    <span aria-hidden="true" className="text-[var(--color-gold)]">
                      ★
                    </span>
                    {book.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex h-full flex-col justify-end pt-20 sm:pt-24">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/76">
                    {book.genre}
                  </p>
                  <h1 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                    {book.title}
                  </h1>
                  <p className="mt-4 text-base font-medium text-white/80 sm:text-lg">by {book.author}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="section-eyebrow">On the shelf now</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 font-semibold text-[var(--color-charcoal)]">
                      {book.genre}
                    </span>
                    <span>{book.year}</span>
                    <span aria-hidden="true">•</span>
                    <span>{book.pages} pages</span>
                    <span aria-hidden="true">•</span>
                    <span>{book.format}</span>
                  </div>
                  <div className="space-y-4 border-l-2 border-black/10 pl-5 sm:pl-6">
                    <h2 className="section-heading text-[var(--color-charcoal)]">{book.title}</h2>
                    <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">{book.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 border-y border-black/10 py-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      Price
                    </p>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-3xl font-bold text-[var(--color-price)] sm:text-4xl">
                        ${book.price.toFixed(2)}
                      </span>
                      {book.originalPrice ? (
                        <span className="text-lg text-[var(--color-strikethrough)] line-through">
                          ${book.originalPrice.toFixed(2)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-[var(--color-muted)]">
                    Pickup and gift wrap available in store.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => addItem(book)}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--color-crimson)] px-5 text-sm font-semibold text-white transition hover:brightness-95"
                  >
                    Add to bag
                  </button>
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-semibold text-[var(--color-charcoal)] transition hover:border-[var(--color-gold)] hover:bg-white/70 sm:flex-none"
                  >
                    Save to wishlist
                  </button>
                </div>
              </div>

              <div className="space-y-4 border-t border-black/10 pt-8">
                <div className="space-y-2">
                  <p className="section-eyebrow">Book details</p>
                  <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--color-charcoal)]">A little more to know</h2>
                </div>
                <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                  {BOOK_INFO_ITEMS.map((item) => (
                    <div key={item.key} className="border-b border-black/10 pb-4">
                      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-base font-semibold text-[var(--color-charcoal)]">{book[item.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
