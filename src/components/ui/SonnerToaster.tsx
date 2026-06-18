"use client";

import { Toaster } from "sonner";
import { Check, X } from 'lucide-react'

export function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      expand
      visibleToasts={3}
      offset={{ top: 92, right: 16 }}
      mobileOffset={{ top: 84, right: 12, left: 12 }}
      toastOptions={{
        unstyled: true,
        duration: 2600,
        classNames: {
          toast:
            "group w-[320px] rounded-lg border border-black/8 bg-[var(--color-cream)] px-4 py-3.5 text-[var(--color-charcoal)] shadow-[0_8px_24px_rgba(30,28,24,0.10)]",
          title: "text-sm font-semibold text-[var(--color-charcoal)] leading-5",
          description: "mt-0.5 text-xs leading-5 text-[var(--color-muted)]",
          success: "border-l-2 border-l-[var(--color-gold)]",
          error: "border-l-2 border-l-[var(--color-crimson)]",
          closeButton:
            "left-auto right-2.5 top-2.5 border-0 bg-transparent text-[var(--color-muted)] transition-colors hover:text-[var(--color-charcoal)]",
        },
      }}
      icons={{
        success: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]">
            <Check className="size-3.5 text-white" strokeWidth={2.5} />
          </div>
        ),
        error: (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-crimson)]">
            <X className="size-3.5 text-white" strokeWidth={2.5} />
          </div>
        ),
      }}
    />
  );
}
