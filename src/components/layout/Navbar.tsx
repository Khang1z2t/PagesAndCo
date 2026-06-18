"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

function NavbarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const hasMountedRef = useRef(false);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const totalItems = useCartStore((state) => state.totalItems);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const displayTotalItems = hasHydrated ? totalItems : 0;

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-[#F4EDDD]/95 backdrop-blur">
      <div className="page-shell py-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 gap-y-3 lg:grid-cols-[auto_1fr_minmax(190px,210px)_auto_auto] lg:gap-4">
          <Link href="/" className="justify-self-start lg:col-start-1 lg:row-start-1">
            <Logo variant="dark" textColor="#000000" />
          </Link>

          <button
            type="button"
            onClick={openLoginModal}
            className="inline-flex h-11 shrink-0 items-center justify-center px-4 text-sm font-medium text-[#6B6B6B] transition hover:text-black lg:col-start-4 lg:row-start-1"
          >
            Sign in
          </button>

          <Link
            href="/bag"
            aria-label={`Shopping bag with ${displayTotalItems} item${displayTotalItems === 1 ? "" : "s"}`}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-4 text-sm font-medium text-white transition hover:bg-black lg:col-start-5 lg:row-start-1"
          >
            <span className="text-white">Bag</span>
            <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[var(--color-gold)] px-2 py-1 text-xs font-semibold text-[var(--color-charcoal)]">
              {displayTotalItems}
            </span>
          </Link>

          <label className="col-span-3 flex h-11 min-w-0 items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-[var(--color-muted)] shadow-sm lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:w-full">
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
              className="w-full min-w-0 border-0 bg-transparent p-0 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>

          <nav
            aria-label="Primary"
            className="col-span-3 pt-1 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-self-center lg:pt-0"
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
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
