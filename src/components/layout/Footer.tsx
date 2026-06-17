import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  FOOTER_GROUPS,
  FREE_SHIPPING_THRESHOLD,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";

const SOCIAL_LABELS = ["in", "X", "f"] as const;

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#2A2420] text-white">
      <div className="page-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.15fr_repeat(3,minmax(0,0.8fr))_1.2fr]">
        <div className="space-y-5 text-center sm:col-span-2 sm:text-left lg:col-span-1">
          <Link href="/" className="inline-flex justify-center sm:justify-start">
            <Logo variant="gold" textColor="#FFFFFF" />
          </Link>
          <p className="mx-auto max-w-xs text-sm leading-6 text-white/72 sm:mx-0">
            {SITE_DESCRIPTION}
          </p>
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            {SOCIAL_LABELS.map((label) => (
              <span
                key={label}
                className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-sm font-semibold text-white/80"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title} className="space-y-4 text-center sm:text-left">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              {group.title}
            </h2>
            <ul className="space-y-3 text-sm text-white/72">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4 text-center sm:col-span-2 sm:text-left lg:col-span-1">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              The Reading Room
            </p>
            <p className="text-sm leading-6 text-white/72">
              One handpicked recommendation in your inbox each week.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-sm flex-nowrap items-center gap-3 sm:mx-0">
            <input
              type="email"
              placeholder="Email address"
              className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-white px-4 text-sm text-[var(--color-charcoal)] outline-none transition focus:border-[var(--color-gold)]"
            />
            <button
              type="button"
              className="inline-flex h-11 w-20 shrink-0 items-center justify-center rounded-md bg-[var(--color-gold)] px-4 text-sm font-semibold text-[var(--color-charcoal)] transition hover:brightness-105"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col items-center gap-3 py-5 text-center text-sm text-white/60 md:flex-row md:justify-between md:text-left">
          <p>
            © 2026 {SITE_NAME} · <span>Privacy</span> · <span>Terms</span>
          </p>
          <p>Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}</p>
        </div>
      </div>
    </footer>
  );
}
