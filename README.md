# Venuze — Event Venue Discovery Platform

A production-grade Next.js application for discovering and booking event venues. Built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and modern React patterns.

## Architecture

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | Server Components, file-based routing, middleware |
| **TypeScript** (strict) | End-to-end type safety |
| **Tailwind CSS v4** | Utility-first styling with `@theme` design tokens |
| **TanStack Query** | Server state management, caching, mutations |
| **Zustand** | Client state (auth, UI) with localStorage persistence |
| **React Hook Form** + **Zod** | Form validation with real-time feedback |
| **Axios** | HTTP client with interceptors and error handling |
| **Lucide React** | Consistent icon system |
| **Framer Motion** | Subtle animations and transitions |
| **Sonner** | Toast notifications |
| **next-themes** | Theme management (light/dark/system) |
| **CVA** + **clsx** | Type-safe component variants |

### Folder Structure

```
app/                          # Next.js App Router pages
├── login/                    # Login page (public)
├── dashboard/                # Dashboard (protected)
├── layout.tsx                # Root layout (fonts, providers)
├── page.tsx                  # Landing page composition
├── error.tsx                 # Global error boundary
├── loading.tsx               # Global loading state
└── not-found.tsx             # 404 page

components/
├── ui/                       # Reusable primitives
│   ├── Button.tsx            # CVA variants (primary/ghost/outline)
│   ├── Card.tsx              # Card with sub-components
│   ├── Pill.tsx              # Badge/chip component
│   ├── Skeleton.tsx          # Loading skeletons
│   └── ...
├── sections/                 # Page sections (11 homepage sections)
│   ├── Navbar.tsx            # Responsive navigation
│   ├── Hero.tsx              # Hero with background image
│   ├── SearchBar.tsx         # 3-state responsive search
│   ├── FeaturedVenuesSection.tsx
│   └── ...
├── forms/
│   └── LoginForm.tsx         # RHF + Zod login form
└── layout/
    └── DashboardShell.tsx    # Dashboard layout

hooks/                        # Custom React hooks
├── useAuth.ts
├── useLogin.ts
└── ...

providers/                    # Application providers
├── Providers.tsx             # Provider composition
├── QueryProvider.tsx         # TanStack Query
└── ThemeProvider.tsx         # next-themes

services/                     # API layer
├── api.ts                    # Axios instance + interceptors
└── auth.ts                   # Auth endpoints

store/                        # Zustand stores
├── authStore.ts              # Auth state with persistence
└── ...

lib/                          # Utilities
├── utils.ts                  # cn() helper
├── constants.ts              # App data and content
└── validations.ts            # Zod schemas

types/                        # TypeScript type definitions
└── auth.ts, common.ts

proxy.ts                      # Route protection (Next.js 16 middleware)
```

## State Management Decisions

### Why TanStack Query instead of manual fetching?

- **Automatic caching**: Deduplicates requests, serves cached data while revalidating
- **Optimistic updates**: UI updates immediately while mutations complete
- **Retry strategy**: Configurable retry with exponential backoff
- **Cache invalidation**: Granular control over when data becomes stale
- **Loading/error states**: Built-in status tracking reduces boilerplate

### Why Zustand instead of Context?

- **Selective re-rendering**: Components only re-render when their selected slice changes
- **No provider nesting**: Stores are consumed directly via hooks
- **Persistence middleware**: Built-in localStorage sync for auth state
- **Splittable**: Separate stores for auth, UI, and theme concerns

### Why Server Components?

- **Reduced client JS**: Static sections (hero, categories, destinations) ship zero JavaScript
- **SEO**: Content is rendered at build time for crawlers
- **Performance**: Smaller bundle, faster page loads

## Authentication Flow

```
1. User submits credentials → POST https://reqres.in/api/login
2. On success → token stored in Zustand (persisted to localStorage)
3. proxy.ts checks auth state on every protected route request
4. On logout → clear store, redirect to /login
5. On page load → restore session from localStorage
```

### Protected Routes

- `proxy.ts` (Next.js 16 middleware convention) intercepts all requests
- Unauthenticated users are redirected from `/dashboard` to `/login`
- Authenticated users attempting to visit `/login` are redirected to `/dashboard`
- Public routes: `/`, `/login`

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

```bash
# .env.local (do not commit — see .env.example for all vars)
NEXT_PUBLIC_API_BASE_URL=https://reqres.in/api
NEXT_PUBLIC_REQRES_API_KEY=your_key_here
# NEXT_PUBLIC_ENABLE_DEMO_FALLBACK=true   # opt-in fallback when reqres is down
```

### Demo Credentials

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

## Responsive Breakpoints

The application is fully responsive across all device sizes:

| Breakpoint | Target |
|------------|--------|
| 320px | Small mobile |
| 375px | Mobile (Figma spec) |
| 640px+ | Tablet (sm) |
| 768px+ | iPad (Figma spec, md) |
| 1024px+ | Desktop (lg) |
| 1280px+ | Large desktop (xl) |
| 1440px+ | Figma desktop canvas |
| 1920px+ | Wide screens |

## Design System

### Colors

| Token | Value |
|-------|-------|
| `primary` | #FF5037 (CTA orange) |
| `hero-overlay` | #372321 |
| `accent-yellow` | #FEC432 |
| `muted` | #808080 |
| `border` | #E5E5E5 |
| `warm-bg` | #FDF1D2 |

### Typography

- **Font**: Poppins (400, 500, 600, 700)
- **Hero H1**: 70px/80px desktop → 30px/40px mobile, weight 600
- **Section H2**: 44px/50px desktop → 30px/34px tablet, weight 600
- **Body**: 16-20px, weight 400, line-height 150%

## Performance Optimizations

- **Server Components** for static content sections
- **Client Components** only where interactivity is required
- **Next.js Image** component with automatic optimization
- **Skeleton loading** for async content (featured venues)
- **Font optimization** via `next/font` with `display: swap`
- **Route-based code splitting** via App Router (automatic)

## Accessibility

- Semantic HTML throughout (nav, main, section, footer)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus rings on all interactive elements
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on all images
- Form validation with `aria-invalid` and `aria-describedby`

## Deployment

Deploy to Vercel:

```bash
npx vercel --prod
```

The build has been verified to complete with zero TypeScript errors and zero ESLint warnings.

## API Resilience Notes

This project integrates with `reqres.in`, a free public mock API with no uptime SLA. During development, intermittent `ERR_TIMED_OUT` failures were observed — a known, publicly-reported issue with this specific free service, not a bug in this codebase.

To handle this like a production dependency rather than assume best-case availability, the API layer implements:

- An explicit 10s request timeout (Axios), so the UI never hangs indefinitely waiting on a slow/unreachable third party.
- Automatic retry with exponential backoff (max 2 retries) for transient failures only — timeouts, network errors, and 5xx responses. Real authentication failures (401/400) are never retried.
- Normalized, typed error handling (`AppError`) so every UI surface shows a correct, specific message (timeout vs. network vs. bad credentials vs. server error) instead of a generic failure state.
- An optional, OFF-by-default demo fallback (`NEXT_PUBLIC_ENABLE_DEMO_FALLBACK=true`) that only activates when the reqres API itself is unreachable AND the exact provided demo credentials (`eve.holt@reqres.in` / `cityslicka`) are used — this exists solely so a live evaluation of this project isn't blocked by a third-party outage outside my control, and every activation is logged clearly to the console.
- `reqres.in` also began requiring an `x-api-key` header on all requests partway through this project; this is configured via `NEXT_PUBLIC_REQRES_API_KEY` in `.env.local`.

## Tradeoffs & Future Improvements

### Current Tradeoffs

- **Static data**: Category cards, destinations, and testimonials use hardcoded data. In production, these would come from a CMS or API.
- **Placeholder images**: The application expects images in `public/images/`. Until these are provided, some sections will display with broken images (the layout remains intact).
- **SearchBar**: The 3-state responsive design (desktop pill / tablet row / mobile card) uses a branched DOM approach. This could be refactored to a single flex layout with more CSS work, but the current approach guarantees pixel accuracy per breakpoint.
- **Auth persistence**: Token is stored in localStorage via Zustand persist middleware. A production app would use HTTP-only cookies for security.

### Future Improvements

- Add image loading with blur placeholders
- Implement venue detail pages with dynamic routing
- Add real search functionality with debounced API calls
- Implement command palette (Ctrl+K)
- Add end-to-end tests with Playwright
- Add unit tests with Vitest + React Testing Library
- Implement i18n for multi-language support
- Add PWA support with service workers

## License

MIT
