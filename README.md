# Pages & Co

Pages & Co is a small bookstore storefront built with Next.js App Router. It focuses on a polished browsing experience for a fictional independent bookshop: curated home sections, catalog browsing, book detail pages, and a persistent bag.

## Project overview

The app presents a hand-picked catalog of books with a warm editorial storefront style. Readers can:

- browse featured, bestseller, and new-arrival shelves
- jump into genre-based browsing
- open individual book pages
- add books to a persistent bag
- review totals before a placeholder checkout step

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand for client state
- Sonner for toast notifications
- Lucide React for icons

## Key features

- Home page with hero carousel, featured genres, curated shelves, and promo banner
- Catalog page with URL-driven browsing controls
- Genre filtering and sort controls on `/books`
- Book detail pages with related-book recommendations
- Add-to-bag flow with toast feedback
- Bag state persisted in `localStorage`
- Lightweight sign-in modal UI
- Shared layout with sticky navbar, footer, and scroll-to-top button

## Routes

- `/` — home page with hero, genre cards, and curated sections
- `/books` — full catalog view
- `/books?genre=<slug>` — catalog filtered by genre
- `/books?sort=<value>` — catalog sorted by the selected option
- `/books?query=<term>` — navbar-driven title/author search route
- `/books/[slug]` — book detail page
- `/bag` — saved bag with quantity controls and order summary

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint

## Project structure

```text
src/
  app/          App Router routes and root layout
  components/   Layout, section, and UI components
  data/         Mock catalog, genre, and hero content
  lib/          Shared constants and utilities
  store/        Zustand stores for auth modal and bag state
  types/        Shared TypeScript types
```

Key route files:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/books/page.tsx`
- `src/app/books/[slug]/page.tsx`
- `src/app/bag/page.tsx`

## State management notes

The app uses two small Zustand stores:

- `useAuthStore` manages the sign-in modal open/close state.
- `useCartStore` manages bag items, totals, hydration state, and persistence.

The bag is persisted with Zustand `persist` and stored as compact `bookId` + `quantity` entries in `localStorage`, then rehydrated into derived totals on load.

## Search behavior summary

Catalog browsing is URL-driven. Genre and sort controls update `/books` through search params, and search is entered through the navbar only.

- search matches book title and author only
- users can submit search with Enter or the search icon
- navbar submit routes to `/books?query=...`
- submitting from the navbar clears any active `genre` filter
- the current `sort` value is preserved where practical on `/books`
- the books page reflects the active search state from the URL
- clearing search removes only the `query` param
- empty results show helper copy with a **Browse all books** CTA
- the URL is the source of truth for the catalog view

## Notes on mock data and scope

- Catalog content is static and lives in `src/data/`.
- There is no backend, database, or CMS in this project.
- Sign-in, wishlist, newsletter join, and checkout are UI-only placeholders.
- Shipping totals are computed locally from constants.
- Inventory, payments, and account management are not implemented.

## Scope snapshot

This repository is currently best understood as a polished frontend storefront prototype rather than a full commerce system.