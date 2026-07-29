# Venuze — Event Space Discovery Platform

A production-quality event venue discovery and booking platform built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

**Live Demo:** https://venuze.vercel.app (or your Vercel URL)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture & Project Structure](#architecture--project-structure)
- [State Management](#state-management)
- [Routing & Auth](#routing--auth)
- [API Integration](#api-integration)
- [Design & Theming](#design--theming)
- [Key Features](#key-features)
- [Engineering Decisions](#engineering-decisions)
- [Challenges Faced](#challenges-faced)
- [Assumptions](#assumptions)

---

## Tech Stack

| Category | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Required by spec, best-in-class SSR/SSG, file-based routing |
| **Language** | TypeScript (strict) | Full type safety, no `any` anywhere |
| **Styling** | Tailwind CSS v4 | Utility-first, dark mode via `class` strategy |
| **Data Fetching** | TanStack Query v5 | Caching, deduplication, optimistic updates, stale-while-revalidate |
| **Client State** | Zustand + persist | Minimal boilerplate, works outside React tree, localStorage + cookie sync |
| **Forms** | React Hook Form + Zod | Performant uncontrolled inputs, schema validation |
| **HTTP Client** | Axios + axios-retry | Interceptors for auth, exponential backoff retry |
| **Icons** | Lucide React | Consistent icon set, tree-shakeable |
| **UI Animations** | Tailwind transitions + Framer Motion | Smooth modal/menu animations |
| **Notifications** | Sonner | Lightweight toast system |
| **Dark Mode** | next-themes | `class` strategy, system detection, persistence |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/<your-username>/venuze
cd venuze
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_REQRES_API_KEY` | API key for reqres.in (free: `free_user_3HAyf5jrbEWR4W3dIEQPnGgJBOu`) |
| `NEXT_PUBLIC_ENABLE_DEMO_FALLBACK` | Set `true` to allow demo fallback when reqres.in is unreachable |

### Run Development

```bash
npm run dev
# http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

### TypeScript Check

```bash
npx tsc --noEmit
```

---

## Architecture & Project Structure

```
app/
├── _components/              # View components for root route
│   ├── HeroSearchView.tsx    # Landing page (hero + all sections)
│   ├── SearchResultsView.tsx # Search results (replaces hero inline)
│   ├── HomePageClient.tsx    # Client-side view switch
│   ├── LocationField.tsx     # "Where" dropdown popover
│   ├── DateField.tsx         # "When" calendar popover
│   ├── GuestField.tsx        # "Guest" stepper popover
│   └── HeroSearchSheet.tsx   # Mobile full-screen search
├── (auth)/login/             # Login route group (no layout override)
│   └── page.tsx
├── (main)/                   # Authenticated route group
│   ├── layout.tsx            # Auth guard (redirects to /login)
│   └── dashboard/page.tsx
├── (public)/search/          # Search sub-components (no route — just _components/)
│   └── _components/          # CategoryTabs, ListingGrid, MapPanel, etc.
├── layout.tsx                # Root layout (Poppins font, Providers, theme)
├── page.tsx                  # Server component shell → HomePageClient
├── error.tsx                 # Global error boundary
├── loading.tsx               # Global loading state
└── not-found.tsx             # 404 page
components/
├── ui/                       # Primitive UI components (Button, Modal, etc.)
├── forms/                    # LoginForm with 6 error states
├── layout/                   # AuthLayout, DashboardShell, UserMenu
├── sections/                 # Landing page sections (Navbar, Hero, Footer, etc.)
└── shared/                   # LoadingScreen
hooks/                        # Custom hooks (useLogin, useLogout, useListingsQuery, useDebounce)
store/                        # Zustand stores (authStore, filterStore, searchViewStore, heroSearchStore)
services/                     # API layer (api.ts, auth.ts, listings.ts)
lib/                          # Utilities (cn(), AppError, validations, constants)
types/                        # TypeScript interfaces (listing.ts, auth.ts, common.ts)
providers/                    # React context providers (Query, Theme, Toaster)
proxy.ts                      # Edge middleware (cookie-based route protection)
```

### Key Architecture Decisions

**Single-page search flow.** The landing page and search results share one route (`/`). A Zustand view store (`searchViewStore`) toggles between `HeroSearchView` and `SearchResultsView` — no URL navigation, no `/search` route. This eliminates flash-of-content on view switch and preserves scroll position.

**Route groups for auth scoping.** Three route groups separate concerns:
- `(auth)` — public login (no layout wrapper)
- `(main)` — authenticated pages (auth guard layout)
- `(public)` — public search sub-components (no route, just shared code)

**Middleware (proxy.ts).** Next.js 16 `proxy.ts` checks for `auth_token` cookie on protected paths and redirects unauthenticated requests to `/login`. The same cookie is used client-side by Zustand persist.

---

## State Management

### Zustand Stores

| Store | Purpose |
|---|---|
| `authStore` | User, token, `setAuth`/`clearAuth` — persisted to localStorage + cookie |
| `filterStore` | Search filters (keyword, category, venueTypes, capacity, price, etc.) |
| `searchViewStore` | Current view: `"landing"` | `"results"` |
| `heroSearchStore` | Hero search bar values (location, dateRange, guests) |

### TanStack Query

| Query | Key | Stale Time |
|---|---|---|
| `useListingsQuery` | `["listings", filters]` | 30s |

The `getListings` service function filters mock venue data based on the current `filterStore` state. When the user performs a search from the hero section, `filterStore.setFilters()` is called with the hero's values, which triggers a TanStack Query refetch via the changing `queryKey`.

---

## Routing & Auth

### Auth Flow

1. User visits `/dashboard` → `proxy.ts` middleware checks for `auth_token` cookie
2. No cookie → redirect to `/login?redirect=/dashboard`
3. User logs in → `useLogin` mutation calls `POST https://reqres.in/api/login`
4. On success → `authStore.setAuth()` stores user + token, sets cookie
5. `useRouter().push(redirect || "/dashboard")`
6. `(main)/layout.tsx` client-side auth guard verifies `isAuthenticated`

### Route Protection

- **Middleware**: `proxy.ts` at project root — runs on Edge for `/dashboard/:path*` and `/login`
- **Client guard**: `app/(main)/layout.tsx` — double-checks auth, shows `LoadingScreen` during check
- **401 interceptor**: Axios response interceptor clears auth and redirects to `/login` on 401

---

## API Integration

### ReqRes.in

The assignment uses [reqres.in](https://reqres.in) as the auth provider:

```
POST https://reqres.in/api/login
{ "email": "eve.holt@reqres.in", "password": "cityslicka" }
```

### API Service Layer

- `services/api.ts` — Axios instance with 10s timeout, `x-api-key` header, `axios-retry` (2 retries, exponential backoff for timeouts/5xx only), 401 interceptor
- `services/auth.ts` — Login API call + optional demo fallback when reqres.in is unreachable
- `services/listings.ts` — Mock data service (40 venues) with client-side filtering/sorting/pagination

### Error Handling

All service functions use `normalizeAxiosError()` from `lib/errors.ts`, which produces a typed `AppError` with 6 kinds: `TIMEOUT`, `NETWORK`, `UNAUTHORIZED`, `SERVER`, `NOT_FOUND`, `UNKNOWN`. The `LoginForm` component renders distinct UI states for each.

---

## Design & Theming

### Figma Implementation

The UI follows a Figma design with:
- Typography: Poppins (400/500/600/700)
- Color system: CSS custom properties via Tailwind `@theme inline`
- Spacing: Consistent 4px grid
- Border radii: 10px (inputs), 20px (cards), full (pills)

### Dark Mode

Supported via `next-themes` with `attribute="class"` strategy. Dark mode CSS variables are defined in `@theme dark {}` block in `globals.css`. Most components use `dark:` Tailwind variants. The theme toggle follows system preference by default and persists to localStorage.

### Responsive Breakpoints

| Breakpoint | Hero View | Results View |
|---|---|---|
| `< 640px` (mobile) | Stacked search card → full-screen sheet | Single column, map hidden behind toggle |
| `640–1024px` (tablet) | Compact search row | 2-column grid |
| `> 1024px` (desktop) | Full 3-segment search pill | 3-column grid + sticky map sidebar |

---

## Key Features

- **Single-page search flow** — hero to results without route change
- **Interactive search bar** — Where (live-filtered destinations), When (calendar), Guest (stepper)
- **Full search results** — category tabs, keyword search, filters modal, sort, map toggle
- **Authentication** — login/logout, cookie-based middleware protection, route guards
- **Dark mode** — system-aware, persisted preference
- **6 error states** — login form shows specific UI for timeout, network, unauthorized, server, validation, unknown
- **Focus trapping** — modals trap Tab/Shift+Tab, restore focus on close
- **Accessibility** — ARIA roles, labels, keyboard navigation, `role="alert"`, `aria-live`
- **Skeleton loaders** — listing cards, full-page loading screen
- **Empty states** — no results found with clear-filters action
- **Error boundary** — global `error.tsx` with retry button
- **Mobile-first responsive** — 3 breakpoints, full-screen search sheet on mobile

---

## Engineering Decisions

### Why no separate `/search` route?

The spec requires search results to render inline on the same page. A separate route would cause a page navigation, losing scroll position and creating a flash. The Zustand view toggle approach provides instant transitions and preserves all client state.

### Why `proxy.ts` over `middleware.ts`?

Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`. The middleware is now configured via `proxy.ts` with a `proxy()` export and `config.matcher` array.

### Why two stores for search fields?

`heroSearchStore` holds the values typed into the hero search bar. `filterStore` holds the active search filters used by the listings query. When the user clicks Search, hero values are copied into `filterStore`, then the view switches. This separation allows the hero to preserve its values when returning from results view without affecting the active filter state.

### Why Zustand over Context?

Zustand stores can be accessed outside the React tree (e.g., in `proxy.ts` via direct import — though Edge Middleware can't import client code, so cookies serve as the sync mechanism). Zustand also avoids Context re-render cascading and allows fine-grained selector subscriptions.

### Why Axios over fetch?

Axios provides request/response interceptors (token injection, 401 handling), automatic JSON parsing, and timeout configuration out of the box. `axios-retry` adds exponential backoff without additional configuration.

### Why are `useAuth.ts` and `useFilterStore.ts` removed?

These were thin re-exports that provided no additional value over direct store imports. Direct store imports with selectors are more explicit and tree-shakeable. Removing them reduces indirection and the risk of circular dependencies.

---

## Challenges Faced

### 1. ReqRes.in Unreliability

The public ReqRes API frequently times out. Solved with:
- 10s Axios timeout
- `axios-retry` with 2 retries for transient failures
- Optional demo fallback (`NEXT_PUBLIC_ENABLE_DEMO_FALLBACK=true`) that returns a mock token when the API is unreachable AND the credentials match the known demo pair

### 2. Dark Mode at Scale

Adding `dark:` variants to every component was time-consuming. Solved by:
- Defining CSS custom property overrides in `@theme dark {}` for our 30+ color tokens
- Using CSS variables (`--color-surface`, `--color-text-primary`) on the root layout so `bg-surface`/`text-text-primary` auto-switch
- Adding `dark:` prefixes only for Tailwind built-in colors (`bg-white`, `text-black`, etc.)

### 3. Focus Trapping in Portals

The `LocationField`, `DateField`, and `GuestField` components use `createPortal` for their popovers. Focus trapping in portals requires special handling because the focusable elements are outside the React DOM tree. Solved by adding a `Tab` key handler in the `Modal` component that enumerates all focusable elements and wraps focus.

### 4. Cookie Sync Between Edge Middleware and Client

Edge Middleware runs at the edge and cannot read `localStorage`. The Zustand `persist` middleware stores auth in localStorage, but the middleware needs a way to know if the user is authenticated. Solution: `js-cookie` sets a cookie (`auth_token`) in parallel whenever `setAuth()` is called. The middleware checks for this cookie. This means two sources of truth, but they're always written together and the cookie drives route protection.

---

## Assumptions

1. **Mock venue data** is sufficient for the assignment. In production, this would come from a backend API with pagination, filtering, and full-text search at the database level.
2. **The Figma design's map section** uses a simplified static map placeholder. A production implementation would integrate Google Maps or Mapbox.
3. **Credential validation** is done client-side via Zod, but the actual auth is delegated to ReqRes. The demo fallback only activates when the API is unreachable and the credentials match the known demo pair.
4. **The "Vendors" toggle** in the hero search bar is present in the UI but doesn't change search behavior — the assignment scope is venue search only.
5. **Footer contact form** inputs are present for layout completeness but have no submit handler. They are decorative per the Figma design.
6. **Placeholder dashboard data** (12 venues, 48 bookings, 4.9 rating) is static. A production version would fetch this from an API.
7. **The `/search/[id]` detail page** linked from `ListingCard` is not implemented — it's a future route outside this assignment's scope.

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
npm i -g vercel
vercel --prod
```

### Manual Build

```bash
npm run build
# Output in .next/
```

---

## License

This project was built as part of a technical assessment. All rights reserved.
