"use client";

import Link from "next/link";
import { CartItem } from "@/components/sections/CartItem";
import { OrderSummary } from "@/components/sections/OrderSummary";
import { books } from "@/data/books";
import { useCartStore } from "@/store/useCartStore";
import type { Book } from "@/types";

const booksById = new Map<string, Book>(books.map((book) => [book.id, book]));

export default function BagPage() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const unavailableItemCount = useCartStore((state) => state.unavailableItemCount);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const resolvedItems = items.flatMap((item) => {
    const book = booksById.get(item.bookId);

    return book ? [{ book, quantity: item.quantity }] : [];
  });
  const hasUnavailableItems = unavailableItemCount > 0;

  if (!hasHydrated) {
    return (
      <section className="pt-4 pb-[var(--section-gap)] sm:pt-5">
        <div className="page-shell space-y-8">
          <div className="space-y-5">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-[var(--color-charcoal)]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--color-charcoal)]">Bag</span>
            </nav>

            <div className="space-y-3">
              <p className="section-eyebrow">Your bag</p>
              <h1 className="section-heading text-[var(--color-charcoal)]">Opening your saved stack…</h1>
              <p className="max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
                We&apos;re checking the titles you saved most recently.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (resolvedItems.length === 0) {
    return (
      <section className="pt-4 pb-[var(--section-gap)] sm:pt-5">
        <div className="page-shell space-y-8">
          <div className="space-y-5">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-[var(--color-charcoal)]">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--color-charcoal)]">Bag</span>
            </nav>

            <div className="space-y-3">
              <p className="section-eyebrow">Your bag</p>
              <h1 className="section-heading text-[var(--color-charcoal)]">Your bag is still a blank page.</h1>
              <p className="max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
                Add a few hand-picked titles and they&apos;ll wait here for you.
              </p>
            </div>
          </div>

          {hasUnavailableItems ? (
            <div className="rounded-md border border-[var(--color-gold)]/40 bg-white/80 px-5 py-4 text-sm text-[var(--color-muted)] shadow-sm">
              {unavailableItemCount} previously saved {unavailableItemCount === 1 ? "title is" : "titles are"} no longer on the shelf, so {unavailableItemCount === 1 ? "it was" : "they were"} left out of this bag view.
            </div>
          ) : null}

          <div className="rounded-md border border-black/10 bg-white/80 px-6 py-8 shadow-[0_18px_40px_rgba(30,28,24,0.06)] sm:px-8 sm:py-10">
            <div className="max-w-2xl space-y-6">
              <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--color-charcoal)] sm:text-4xl">
                Start with the shelves that match your mood.
              </h2>
              <p className="text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                Browse fresh arrivals, old favorites, and quiet discoveries from around the shop.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/books"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-crimson)] px-5 text-sm font-semibold !text-white transition hover:brightness-95 hover:!text-white"
                >
                  Visit the shelves
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-semibold text-[var(--color-charcoal)] transition hover:border-[var(--color-gold)] hover:bg-white"
                >
                  Return home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 pb-[var(--section-gap)] sm:pt-10">
      <div className="page-shell space-y-8">
        <div className="space-y-5">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[var(--color-charcoal)]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-charcoal)]">Bag</span>
          </nav>

          <div className="space-y-3">
            <p className="section-eyebrow">Your bag</p>
            <h1 className="section-heading text-[var(--color-charcoal)]">{totalItems} {totalItems === 1 ? "book" : "books"} waiting to come home.</h1>
            <p className="max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
              Review your stack, adjust the quantities, and sign in when you&apos;re ready to check out.
            </p>
          </div>
        </div>

        {hasUnavailableItems ? (
          <div className="rounded-md border border-[var(--color-gold)]/40 bg-white/80 px-5 py-4 text-sm text-[var(--color-muted)] shadow-sm">
            A previously saved title is no longer on the shelf, so it was left out of the total.
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px] xl:items-start">
          <div className="space-y-4">
            {resolvedItems.map(({ book, quantity }) => (
              <CartItem
                key={book.id}
                book={book}
                quantity={quantity}
                onIncrease={() => updateQuantity(book.id, quantity + 1)}
                onDecrease={() => updateQuantity(book.id, quantity - 1)}
                onRemove={() => removeItem(book.id)}
              />
            ))}
          </div>

          <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
        </div>
      </div>
    </section>
  );
}
