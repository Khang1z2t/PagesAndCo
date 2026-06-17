"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Logo } from "./Logo";

export default function LoginModal() {
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal);

  useEffect(() => {
    if (!isLoginModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLoginModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLoginModal, isLoginModalOpen]);

  if (!isLoginModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={closeLoginModal}
    >
      <div
        className="relative w-full max-w-md rounded-[2rem] bg-[var(--color-cream)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close login modal"
          onClick={closeLoginModal}
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--color-charcoal)] transition hover:bg-black/5 sm:right-8 sm:top-8"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="m5 5 10 10" />
            <path d="M15 5 5 15" />
          </svg>
        </button>

        <div className="pr-14 text-[var(--color-charcoal)]">
          <Logo showText={false} />
          <div className="mt-6">
            <h2
              id="login-modal-title"
              className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-charcoal)]"
            >
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Sign in to access your bag, orders and wishlist.
            </p>
          </div>
        </div>

        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            closeLoginModal();
          }}
        >
          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              className="min-h-12 w-full rounded-md border border-black/10 bg-white px-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Password
            </span>
            <input
              type="password"
              placeholder="••••••••"
              className="min-h-12 w-full rounded-md border border-black/10 bg-white px-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-crimson)] px-5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          New here?{" "}
          <button
            type="button"
            className="font-medium text-[var(--color-crimson)] underline underline-offset-4"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
