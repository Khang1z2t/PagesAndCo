import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function PromoBanner() {
  return (
    <section className="py-6">
      <div className="page-shell overflow-hidden rounded-md border border-white/10 bg-[var(--color-forest)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(30,28,24,0.16)] sm:px-10 lg:px-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-[44rem] space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
              The Reading Room
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
              Free shipping on every order over ${FREE_SHIPPING_THRESHOLD}.
            </h2>
            <p className="text-lg leading-8 text-white/72">
              Join free for 15% off your first month, a weekly recommendation tailored to your shelf, and quieter updates when something special lands in the shop.
            </p>
          </div>
          <Link
            href="/#reading-room"
            className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-[var(--color-gold)] px-7 text-sm font-bold text-[var(--color-charcoal)] shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Join free
          </Link>
        </div>
      </div>
    </section>
  );
}
