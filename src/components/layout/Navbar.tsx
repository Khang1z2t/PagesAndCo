"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const pathname = usePathname();
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const totalItems = useCartStore((state) => state.totalItems);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const displayTotalItems = hasHydrated ? totalItems : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-[#F4EDDD]/95 backdrop-blur">
      <div className="page-shell py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6">
          <Link href="/" className="order-1 shrink-0 lg:justify-self-start">
            <Logo variant="dark" textColor="#000000" />
          </Link>

          <nav
            aria-label="Primary"
            className="order-3 basis-full pt-1 lg:order-2 lg:basis-auto lg:pt-0 lg:justify-self-center"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
              {NAV_LINKS.map((link) => {
                const hrefPath = link.href.split("?")[0];
                const isActive =
                  hrefPath === "/" ? pathname === "/" : pathname.startsWith(hrefPath);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex px-3 py-2 text-sm font-medium transition hover:text-black",
                        isActive ? "text-black" : "text-[#6B6B6B]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="order-2 flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 sm:flex-nowrap lg:order-3 lg:flex-none lg:justify-self-end">
            <label className="flex h-11 min-w-[180px] flex-1 items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-[var(--color-muted)] shadow-sm sm:w-[220px] sm:flex-none xl:w-[190px] 2xl:w-[210px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 text-[var(--color-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M8.5 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" />
                <path d="m13.5 13.5 4 4" />
              </svg>
              <input
                type="search"
                placeholder="Search titles, authors..."
                className="w-full border-0 bg-transparent p-0 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
              />
            </label>

            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex h-11 shrink-0 items-center justify-center px-4 text-sm font-medium text-[#6B6B6B] transition hover:text-black"
            >
              Sign in
            </button>

            <Link
              href="/bag"
              aria-label={`Shopping bag with ${displayTotalItems} item${displayTotalItems === 1 ? "" : "s"}`}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 text-sm font-medium text-white transition hover:bg-black"
            >
              <span className="text-white">Bag</span>
              <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[var(--color-gold)] px-2 py-1 text-xs font-semibold text-[var(--color-charcoal)]">
                {displayTotalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
