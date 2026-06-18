"use client";

import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function OrderSummary({ totalItems, totalPrice }: OrderSummaryProps) {
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const qualifiesForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingPrice = qualifiesForFreeShipping ? 0 : SHIPPING_FEE;
  const estimatedTotal = totalPrice + shippingPrice;

  return (
    <aside className="rounded-md border border-black/10 bg-white/90 p-6 shadow-[0_18px_38px_rgba(30,28,24,0.08)] sm:p-7 lg:sticky lg:top-28">
      <div className="space-y-2 border-b border-black/10 pb-5">
        <p className="section-eyebrow">Order summary</p>
        <h2 className="font-serif text-3xl tracking-[-0.04em] text-[var(--color-charcoal)]">Ready when you are</h2>
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          {totalItems} {totalItems === 1 ? "book is" : "books are"} tucked into your bag.
        </p>
      </div>

      <div className="space-y-4 py-5 text-sm text-[var(--color-charcoal)]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--color-muted)]">Books</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--color-muted)]">Subtotal</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[var(--color-muted)]">Shipping</span>
          <span className="font-semibold">
            {qualifiesForFreeShipping ? "Free" : `$${SHIPPING_FEE.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="space-y-5 border-t border-black/10 pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-[var(--color-charcoal)]">Estimated total</span>
          <span className="text-2xl font-bold text-[var(--color-price)]">${estimatedTotal.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={openLoginModal}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-crimson)] px-5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Continue to checkout
        </button>

        <p className="text-sm leading-6 text-[var(--color-muted)]">
          {qualifiesForFreeShipping
            ? "Sign in to continue with checkout, pickup details, and saved shelves."
            : `Sign in to continue with checkout. Orders over $${FREE_SHIPPING_THRESHOLD} ship free.`}
        </p>
      </div>
    </aside>
  );
}
