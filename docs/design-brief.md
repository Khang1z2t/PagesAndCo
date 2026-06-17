# Pages & Co — Design Brief

> An independent bookshop for readers who like to take their time. Open since 1998.

---

## Design Tokens

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Cream (Background) | `#EDE8DC` | Page background |
| Dark Charcoal | `#1E1C18` | Footer background |
| Forest Green | `#2D5A45` | Hero banner, book covers accent |
| Crimson Red | `#8B2E2E` | Primary CTA button, logo circle |
| Golden Yellow | `#B8862A` | Secondary CTA, badge "BESTSELLER", Join button |
| White | `#FFFFFF` | Cards, modal background |
| Text Dark | `#1A1A1A` | Headings, body text |
| Text Muted | `#6B6B6B` | Subtitles, metadata |
| Price Red | `#8B2E2E` | Sale price highlight |
| Price Strikethrough | `#999999` | Original price |

### Typography

- **Logo:** Bold serif-style, "Pages & Co." with circular `P` icon (dark red `#8B2E2E`)
- **Nav links:** Small, regular weight, sans-serif
- **Section eyebrow:** Uppercase, letter-spaced, small — e.g. `STAFF FAVOURITES`, `EDITOR'S PICKS`
- **Section heading:** Large bold serif — e.g. `The shelves we keep coming back to`
- **Body:** Regular sans-serif, comfortable line height
- **Price:** Semi-bold, red for sale price; strikethrough grey for original

### Spacing & Layout

- Max content width: ~1140px, centered
- Consistent horizontal padding on all sections
- Card grid: 5-col (featured), 4-col (bestsellers/new arrivals), 5-col (list page)
- Section gap between sections: ~60–80px

---

## Components

### 1. Navbar (`/src/components/layout/Navbar.tsx`)

```
[Logo: P • Pages & Co.]  [Home] [Shop All] [Fiction] [Mystery] [Children] [Poetry]  [Search input]  [Sign in btn]  [Bag btn + count]
```

- Logo: circular dark-red `P` icon + bold text
- Nav links: plain text, no underline
- Search: input with placeholder `Search titles, authors...`, left search icon
- Sign in: outlined pill button
- Bag: filled dark pill button with item count badge (golden yellow)

---

### 2. Footer (`/src/components/layout/Footer.tsx`)

Background: `#1E1C18` (near-black)

**4 columns:**

| Column | Content |
|--------|---------|
| Brand | Logo (golden variant), tagline, social icons (LinkedIn, X, Facebook) |
| SHOP | New arrivals, Bestsellers, Fiction, Children, Gift cards |
| ABOUT | Our story, Events, Visit the shop, Journal |
| HELP | Shipping, Returns, FAQ, Contact |
| THE READING ROOM | "One handpicked recommendation in your inbox each week." + Email input + Join button |

Bottom bar: `© 2026 Pages & Co. · Privacy · Terms` (left) | `Free shipping on orders over $35` (right)

---

### 3. Book Card (`/src/components/ui/BookCard.tsx`)

```
┌─────────────────┐
│   [Cover Image] │  ← colored gradient, title + author on cover
│  [BADGE corner] │  ← "BESTSELLER" (golden) or "NEW" (white/light)
└─────────────────┘
  Book Title (truncated)
  Author Name (muted)
  $18.00  ~~$24.00~~  ★ 4.6
```

- Cover: colored gradient rectangle (no real image, just color block with text)
- Badge: top-left corner, pill shape
- Rating: star icon + number, right-aligned
- On hover: subtle shadow/lift (inferred)

---

### 4. Hero Banner / Carousel (`/src/components/sections/HeroBanner.tsx`)

Full-width, dark forest green background (`#2D5A45`)

```
[←]  STAFF FAVOURITES (eyebrow)
     The shelves         [→]
     we keep
     coming back to
     
     Subtitle text...
     
     [Browse bestsellers] (golden CTA button)
     
     ● ● ●  (pagination dots)
```

- Left/right arrow buttons (white circle)
- 3 slides (dots indicator)
- CTA: golden pill button

---

### 5. Genre Grid (`/src/components/sections/GenreGrid.tsx`)

Section: `FIND YOUR SHELF` eyebrow + `Browse by genre` heading

6 colored genre tiles in a row:

| Genre | Color |
|-------|-------|
| Fiction | Crimson `#8B3A3A` |
| Mystery | Slate Blue `#4A5568` |
| Sci-Fi | Teal `#2D7A8A` |
| Poetry | Mauve `#7A4A6A` |
| Children | Golden `#B8862A` |
| Non-fiction | Purple `#5A4A7A` |

Each tile: genre name (bold white) + `X titles` subtitle (light white)

---

### 6. Book Section (`/src/components/sections/BookSection.tsx`)

Reusable section with:
- Eyebrow label (uppercase, muted)
- Section title (bold, large)
- `View all →` link (right-aligned, crimson)
- Book card grid (4–5 columns)

Used for: Featured this month, Bestsellers, New arrivals

---

### 7. Promo Banner (`/src/components/sections/PromoBanner.tsx`)

Dark forest green full-width banner:

```
THE READING ROOM (eyebrow)
Free shipping on              [Join free] (golden pill)
every order over $35

Plus 15% off your first month and a weekly recommendation picked just for you.
```

---

## Pages

### Home Page (`/src/app/page.tsx`)
**Sections in order:**
1. Hero Banner (carousel, 3 slides)
2. Browse by Genre (6 genre tiles)
3. Featured This Month (5 book cards + View all)
4. Promo Banner (Free shipping / Reading Room)
5. Bestsellers (4+ book cards + View all)
6. New Arrivals (4 book cards + View all)
7. Footer

---

### List Page (`/src/app/books/page.tsx`)
Route: `/books`

```
Home / Books  (breadcrumb)
All books
14 titles in the collection  (subtitle)

[All] [Fiction] [Mystery] [Sci-Fi] [Non-fiction] [Poetry] [Children] [Biography]  Sort by: [Featured ▾]
```

- Filter pills: `All` is active (filled dark red), rest are outlined
- Sort dropdown: right-aligned
- Book grid: 5 columns
- Pagination or infinite scroll (inferred)

---

### Detail Page (`/src/app/books/[slug]/page.tsx`)
Route: `/books/[slug]`

```
Home / Books / The Lighthouse Keeper  (breadcrumb)

[Book Cover]    FICTION (badge)
                The Lighthouse Keeper
                by Mara Ellison
                ★ 4.6  ·  312 pages  ·  2023
                
                $18.00  ~~$24.00~~
                
                Description text...
                
                [Add to bag — $18.00]  [♡ Wishlist]
                
                FORMAT      PAGES       PUBLISHED
                Paperback   312         2023
                
                PUBLISHER   LANGUAGE    ISBN
                Harbor & Vale  English  978-1-23456-001-2
```

**You may also like** — horizontal book card row (2+ cards shown)

---

### Checkout / Bag Page (`/src/app/bag/page.tsx`)
Route: `/bag`

```
Home / Bag  (breadcrumb)
Your bag

┌─────────────────────────────────────────────┐
│ [Cover] The Lighthouse Keeper               │
│         Mara Ellison         [−] 2 [+] $36.00│
│         Remove                               │
└─────────────────────────────────────────────┘

                        ┌─────────────────────┐
                        │ Order summary        │
                        │ Subtotal (2 items) $36.00 │
                        │ Shipping        Free │
                        │ ─────────────────── │
                        │ Total          $36.00│
                        │ [    Checkout    ]   │
                        │ You'll be asked to   │
                        │ sign in to complete. │
                        └─────────────────────┘
```

- Left: cart items (quantity stepper, remove link)
- Right: sticky order summary card + Checkout CTA (crimson full-width)

---

### Login Modal (`/src/components/ui/LoginModal.tsx`)

Triggered overlay on top of current page (backdrop blur/dim)

```
         ┌──────────────────────────────┐
         │ [P logo]                  [×] │
         │ Welcome back                  │
         │ Sign in to access your bag,   │
         │ orders and wishlist.          │
         │                               │
         │ EMAIL                         │
         │ [you@example.com          ]   │
         │                               │
         │ PASSWORD                      │
         │ [••••••••                 ]   │
         │                               │
         │ [       Sign in           ]   │
         │                               │
         │  New here? Create an account  │
         └──────────────────────────────┘
```

- Modal: white/cream background, rounded corners
- Background: page blurred + darkened overlay
- Logo: circular `P` icon (dark red) top-left
- Close button: `×` top-right
- Sign in: full-width crimson button
- Register link: `Create an account` in crimson underline

> Note: Register page likely reuses same modal structure with different fields.

---

## Routes Summary

| Route | Page |
|-------|------|
| `/` | Home |
| `/books` | All Books (List) |
| `/books/[slug]` | Book Detail |
| `/bag` | Checkout / Bag |
| `modal` | Login (overlay modal, not a route) |

---

## Assets Reference

| File | Description |
|------|-------------|
| `home-1.png` | Home page — Hero banner + Browse by genre + Featured this month (top) |
| `home-2.png` | Home page — Featured this month (continued) + Promo banner + Bestsellers |
| `home-3.png` | Home page — Bestsellers (continued) + New arrivals + Footer |
| `list-page.png` | All books page — filter pills, sort, 5-col grid |
| `detail-page.png` | Book detail page — cover, metadata, add to bag, you may also like |
| `checkout.png` | Bag/Checkout page — cart items + order summary |
| `login-modal.png` | Login modal overlay on detail page |
