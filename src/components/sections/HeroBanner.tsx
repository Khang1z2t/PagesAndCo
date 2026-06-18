"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

interface HeroBannerProps {
  slides: HeroSlide[];
}

export function HeroBanner({ slides }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPausedAfterInteraction, setIsPausedAfterInteraction] = useState(false);
  const activeSlide = slides[activeIndex];

  function showPrevious() {
    setIsPausedAfterInteraction(true);
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }

  function showNext() {
    setIsPausedAfterInteraction(true);
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
      setIsPausedAfterInteraction(false);
    }, isPausedAfterInteraction ? 4000 : 6500);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isPausedAfterInteraction, slides.length]);

  function showSlide(index: number) {
    setIsPausedAfterInteraction(true);
    setActiveIndex(index);
  }

  return (
    <section className="pt-8 sm:pt-10">
      <div className="page-shell overflow-hidden rounded-md bg-[var(--color-forest)] text-white shadow-[0_26px_70px_rgba(30,28,24,0.18)]">
        <div className="relative min-h-[34rem] overflow-hidden p-7 sm:p-10 lg:min-h-[36rem] lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(184,134,42,0.18),transparent_26%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="absolute left-[-1.5rem] top-10 h-72 w-40 -rotate-6 rounded-[1.75rem] bg-[#8B3A3A]/88 shadow-[0_26px_60px_rgba(0,0,0,0.22)]" />
          <div className="absolute right-[-1rem] bottom-12 h-80 w-44 rotate-6 rounded-[1.75rem] bg-[#3A465B]/82 shadow-[0_26px_60px_rgba(0,0,0,0.2)]" />

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous hero slide"
            className="absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-light leading-none text-[var(--color-charcoal)] shadow-sm transition hover:bg-[var(--color-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:left-6 lg:left-8"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next hero slide"
            className="absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-light leading-none text-[var(--color-charcoal)] shadow-sm transition hover:bg-[var(--color-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-6 lg:right-8"
          >
            &gt;
          </button>

          <div className="relative flex min-h-[calc(34rem-3.5rem)] flex-col justify-between gap-10 px-10 sm:px-14 lg:min-h-[calc(36rem-7rem)] lg:px-20">
            <div className="max-w-3xl space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                {activeSlide.eyebrow}
              </p>
              <div className="max-w-2xl space-y-5">
                <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                  {activeSlide.title}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-white/74">
                  {activeSlide.description}
                </p>
              </div>
              <Link
                href={activeSlide.ctaHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-gold)] px-7 text-sm font-bold text-[var(--color-charcoal)] shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {activeSlide.ctaLabel}
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2" aria-label="Hero slide pagination">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                  className={cn(
                    "h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    index === activeIndex
                      ? "w-9 bg-[var(--color-gold)]"
                      : "w-2.5 bg-white/38 hover:bg-white/65",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
