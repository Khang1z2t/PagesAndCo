"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

interface HeroBannerProps {
  slides: HeroSlide[];
}

export function HeroBanner({ slides }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }

  return (
    <section className="pt-8 sm:pt-10">
      <div className="page-shell overflow-hidden rounded-[2rem] bg-[var(--color-forest)] text-white shadow-[0_26px_70px_rgba(30,28,24,0.18)]">
        <div className="grid min-h-[34rem] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
            <div className="space-y-7">
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

            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2" aria-label="Hero slide pagination">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
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
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Show previous hero slide"
                  className="flex size-11 items-center justify-center rounded-full bg-white text-[var(--color-charcoal)] shadow-sm transition hover:bg-[var(--color-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Show next hero slide"
                  className="flex size-11 items-center justify-center rounded-full bg-white text-[var(--color-charcoal)] shadow-sm transition hover:bg-[var(--color-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden bg-[#244a39] p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(184,134,42,0.24),transparent_30%),radial-gradient(circle_at_74%_68%,rgba(255,255,255,0.12),transparent_34%)]" />
            <div className="relative mx-auto flex h-full max-w-md items-center justify-center">
              <div className="absolute left-4 top-10 h-64 w-36 -rotate-6 rounded-lg bg-[#8B3A3A] shadow-[0_26px_60px_rgba(0,0,0,0.28)]" />
              <div className="absolute bottom-10 right-2 h-72 w-40 rotate-6 rounded-lg bg-[#3A465B] shadow-[0_26px_60px_rgba(0,0,0,0.28)]" />
              <div className="relative z-10 h-80 w-52 rounded-xl bg-[var(--color-gold)] p-6 text-[var(--color-charcoal)] shadow-[0_34px_80px_rgba(0,0,0,0.32)] sm:h-96 sm:w-64">
                <div className="mb-12 h-2 w-16 rounded-full bg-[var(--color-charcoal)]/28" />
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-charcoal)]/62">
                  Pages & Co picks
                </p>
                <p className="font-serif text-4xl leading-none tracking-[-0.06em] sm:text-5xl">
                  Read slowly.
                </p>
                <div className="absolute inset-x-6 bottom-6 h-px bg-[var(--color-charcoal)]/28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
