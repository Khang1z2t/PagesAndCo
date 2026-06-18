"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { BookSortValue, Genre, SortOption } from "@/types";

interface BookFiltersProps {
  genres: Genre[];
  sortOptions: SortOption[];
  activeGenre?: string;
  activeSort: BookSortValue;
  activeQuery?: string;
}

export function BookFilters({ genres, sortOptions, activeGenre, activeSort, activeQuery }: BookFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const activeSortLabel = sortOptions.find((option) => option.value === activeSort)?.label ?? "Featured";

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function navigate(nextGenre: string | undefined, nextSort: BookSortValue) {
    const params = new URLSearchParams();

    if (nextGenre) {
      params.set("genre", nextGenre);
    }

    if (activeQuery) {
      params.set("query", activeQuery);
    }

    if (nextSort !== "featured") {
      params.set("sort", nextSort);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleSortSelect(nextSort: BookSortValue) {
    setIsSortOpen(false);
    navigate(activeGenre, nextSort);
  }

  return (
    <div className="flex flex-col gap-5 border-b border-black/20 pb-5 sm:pb-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate(undefined, activeSort)}
          className={cn(
            "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]",
            activeGenre === undefined
              ? "border-[var(--color-crimson)] bg-[var(--color-crimson)] text-white"
              : "border-black/10 bg-white text-[var(--color-charcoal)] hover:border-[var(--color-gold)] hover:bg-white/80",
          )}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.slug}
            type="button"
            onClick={() => navigate(genre.slug, activeSort)}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]",
              activeGenre === genre.slug
                ? "border-[var(--color-crimson)] bg-[var(--color-crimson)] text-white"
                : "border-black/10 bg-white text-[var(--color-charcoal)] hover:border-[var(--color-gold)] hover:bg-white/80",
            )}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 lg:self-start">
        <span className="shrink-0 text-sm font-semibold text-[var(--color-charcoal)]">Sort by</span>

        <div ref={sortMenuRef} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            onClick={() => setIsSortOpen((current) => !current)}
            className="inline-flex h-10 min-w-44 items-center justify-between gap-3 rounded-md border border-black/10 bg-white px-4 text-sm font-semibold text-[var(--color-charcoal)] transition hover:border-[var(--color-gold)] hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
          >
            <span className="truncate">{activeSortLabel}</span>
            <span
              aria-hidden="true"
              className={cn("text-[10px] text-[var(--color-muted)] transition", isSortOpen && "rotate-180")}
            >
              ▾
            </span>
          </button>

          {isSortOpen ? (
            <div
              role="listbox"
              aria-label="Sort books"
              className="absolute right-0 z-20 mt-2 flex min-w-56 flex-col gap-1.5 rounded-md border border-black/10 bg-[color-mix(in_srgb,var(--color-cream)_88%,white_12%)] p-2 shadow-[0_18px_40px_rgba(30,28,24,0.08)]"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={activeSort === option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={cn(
                    "w-full rounded-md border px-4 py-2 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]",
                    activeSort === option.value
                      ? "border-[var(--color-crimson)] bg-[var(--color-crimson)] text-white"
                      : "border-transparent bg-white text-[var(--color-charcoal)] hover:border-[var(--color-gold)] hover:bg-white/80",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
