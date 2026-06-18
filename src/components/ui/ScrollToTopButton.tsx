"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 240);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-[color-mix(in_srgb,var(--color-cream)_88%,white_12%)] text-lg text-[var(--color-charcoal)] shadow-[0_16px_32px_rgba(30,28,24,0.14)] transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:bg-[color-mix(in_srgb,var(--color-cream)_76%,white_24%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] sm:bottom-6 sm:right-6"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
