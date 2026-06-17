# Pages & Co — Architecture & Conventions

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 (App Router) | File-based routing, SSR/SSG |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 | Utility-first |
| UI Components | shadcn/ui | Accessible, customizable base |
| Icons | lucide-react | Tree-shakable |
| Font | next/font | Zero layout shift |
| State | Zustand | Lightweight cart/auth state |
| Deployment | Vercel (Serverless) | Zero config, edge-ready |
| Package Manager | npm | Zero config with create-next-app |

### Serverless Constraints

> This app runs on **Vercel Serverless Functions** — no persistent server.

- **No** long-running processes or WebSockets
- **No** in-memory state between requests (use Zustand for client-side only)
- **No** local file system writes at runtime
- Each route handler (`route.ts`) is a cold-start serverless function
- Keep API routes lightweight — avoid heavy imports
- Use `export const runtime = 'edge'` for latency-sensitive routes if needed

### ❌ Not Used

| Skip | Reason |
|------|--------|
| Redux / Context (cart) | Overkill — Zustand is enough |
| CSS Modules / Styled Components | Tailwind covers it |
| Axios | Native `fetch` is sufficient |
| React Query | Static mock data, no real API |
| Framer Motion | No complex animation in design |
| next-auth | Login is UI-only modal for this test |
| Express / custom server | Incompatible with serverless |
| fs / path at runtime | No file system on serverless |

---

## Folder Structure

```
PagesAndCo/
├── docs/
│   ├── assets/                 # Original design screenshots
│   ├── design-brief.md         # Design analysis
│   └── architecture.md         # This file
│
├── src/
│   ├── app/                    # Next.js App Router — pages only
│   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   ├── page.tsx            # /
│   │   ├── globals.css         # Tailwind base + CSS variables
│   │   ├── books/
│   │   │   ├── page.tsx        # /books
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # /books/[slug]
│   │   └── bag/
│   │       └── page.tsx        # /bag
│   │
│   ├── components/
│   │   ├── layout/             # Rendered on every page via root layout
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/                 # Atomic, reusable anywhere
│   │   │   ├── BookCard.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── LoginModal.tsx
│   │   │   └── QuantityStepper.tsx
│   │   │
│   │   └── sections/           # Page-specific blocks
│   │       ├── HeroBanner.tsx
│   │       ├── GenreGrid.tsx
│   │       ├── BookSection.tsx  # Reusable: Featured / Bestsellers / New arrivals
│   │       ├── PromoBanner.tsx
│   │       ├── BookFilters.tsx
│   │       ├── BookGrid.tsx
│   │       ├── BookDetail.tsx
│   │       ├── RelatedBooks.tsx
│   │       ├── CartItem.tsx
│   │       └── OrderSummary.tsx
│   │
│   ├── data/                   # Static mock data (replaces API)
│   │   ├── books.ts
│   │   └── genres.ts
│   │
│   ├── store/                  # Zustand — client-side only
│   │   ├── useCartStore.ts
│   │   └── useAuthStore.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── lib/
│       ├── utils.ts            # cn() helper
│       └── constants.ts        # NAV_LINKS, GENRES, SORT_OPTIONS
│
└── public/
```

---

## Routing

| URL | File | Notes |
|-----|------|-------|
| `/` | `app/page.tsx` | Home |
| `/books` | `app/books/page.tsx` | Filter via `?genre=&sort=` |
| `/books/[slug]` | `app/books/[slug]/page.tsx` | Detail |
| `/bag` | `app/bag/page.tsx` | Cart + checkout |
| Login | Modal only | No dedicated route |

---

## Types

```ts
// src/types/index.ts

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  pages: number
  year: number
  genre: string
  coverColor: string        // design uses color blocks, not real images
  badge?: 'BESTSELLER' | 'NEW'
  description?: string
  format?: string
  publisher?: string
  language?: string
  isbn?: string
}

export interface CartItem {
  book: Book
  quantity: number
}

export interface Genre {
  name: string
  slug: string
  color: string
  count: number
}
```

---

## State (Zustand)

```ts
// useCartStore.ts
interface CartStore {
  items: CartItem[]
  addItem: (book: Book) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, qty: number) => void
  totalItems: number
  totalPrice: number
}

// useAuthStore.ts
interface AuthStore {
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}
```

> Zustand state lives in the browser only. Never rely on it server-side.

---

## Component Rules

| Folder | Rule |
|--------|------|
| `layout/` | No page-specific props. Renders on every page. |
| `ui/` | Receives data via props. No direct store calls (except cart). No data fetching. |
| `sections/` | Can read from `data/` directly. One page uses each section. |
| `app/` pages | Orchestrates only. Passes data down. No complex JSX logic. |

---

## Styling Rules

```tsx
// ✅ Tailwind utilities
<div className="flex items-center gap-4 px-6 py-3">

// ✅ cn() for conditional classes
<button className={cn('px-4 py-2 rounded-full', isActive && 'bg-[#8B2E2E] text-white')}>

// ✅ inline style only for dynamic values from data
<div style={{ backgroundColor: genre.color }}>

// ❌ inline style for static values
<div style={{ padding: '16px' }}>
```

```css
/* globals.css */
:root {
  --color-cream: #EDE8DC;
  --color-charcoal: #1E1C18;
  --color-forest: #2D5A45;
  --color-crimson: #8B2E2E;
  --color-gold: #B8862A;
}
```

---

## Do's & Don'ts

### ✅ Do
- Split component when JSX exceeds ~50 lines
- Keep mock data in `data/`, never hardcode in components
- Use `next/link` for all internal navigation
- Use `next/image` for all images
- Mobile-first responsive with Tailwind breakpoints
- Full TypeScript — no `any`

### ❌ Don't
- No per-component CSS files
- No business logic inside JSX
- No `useEffect` for data fetching — use Server Components
- No magic strings — move to `constants.ts`
- No server-side access to Zustand store
- No `fs`, `path`, or Node-only APIs in components or pages
