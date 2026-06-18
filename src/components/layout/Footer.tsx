import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  FOOTER_GROUPS,
  FREE_SHIPPING_THRESHOLD,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yunok",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.14 3 3.25 3.9 3.25 5s.89 2 2 2 2-.9 2-2-.89-2-2-2ZM20.75 13.1c0-3.02-1.61-4.43-3.76-4.43-1.73 0-2.5.95-2.93 1.62V8.5H10.7c.04 1.18 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.67.12-.91.27-.67.89-1.37 1.93-1.37 1.36 0 1.91 1.04 1.91 2.56V20H21.4v-6.9Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-7.38L5.6 22H2.5l7.25-8.29L1.8 2h6.4l4.42 6.78L18.9 2Zm-1.1 18h1.72L7.22 3.9H5.38L17.8 20Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Yuno1z2t",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M13.5 21v-7.2H16l.38-2.8H13.5V9.23c0-.81.24-1.36 1.45-1.36h1.55V5.35c-.27-.03-1.2-.1-2.29-.1-2.27 0-3.83 1.35-3.83 3.84V11H8v2.8h2.38V21h3.12Z" />
      </svg>
    ),
  },
] as const;

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
            {SOCIAL_LINKS.map(({ label, href, icon }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${label} profile`}
                  className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-[var(--color-gold)] hover:text-white"
                >
                  {icon}
                </a>
              ) : (
                <span
                  key={label}
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40"
                >
                  {icon}
                </span>
              ),
            )}
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
            © 2026 {SITE_NAME} · <span>Privacy</span> · <span>Terms</span> · Built by{" "}
            <a
              href="https://github.com/Khang1z2t"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 transition hover:text-[var(--color-gold)]"
            >
              @yunok
            </a>
          </p>
          <p>Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}</p>
        </div>
      </div>
    </footer>
  );
}
