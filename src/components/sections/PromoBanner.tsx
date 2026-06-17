import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function PromoBanner() {
  return (
    <section className="py-6">
      <div className="page-shell overflow-hidden rounded-[2rem] bg-[var(--color-forest)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(30,28,24,0.16)] sm:px-10 lg:px-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
              The Reading Room
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
              Free shipping over ${FREE_SHIPPING_THRESHOLD}, plus first access to member picks.
            </h2>
            <p className="text-base leading-7 text-white/72">
              Join free for weekly recommendations, early new-arrival notes, and a gentler way to keep your nightstand stocked.
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
