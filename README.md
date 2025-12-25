# Alrahma Frontend (Next.js App Router)

Production-ready frontend scaffold for Alrahma built with modern Next.js best practices and a scalable, typed architecture.

## Stack

- **Next.js** `15.5.7` (App Router)
- **TypeScript**
- **React 18+**
- **Tailwind CSS** + plugins: `@tailwindcss/forms`, `@tailwindcss/typography`
- **Dark mode**: Tailwind `class` strategy via `next-themes`
- **Redux Toolkit**: app state (auth/dashboard/notifications)
- **TanStack Query**: server state / caching
- **Axios**: HTTP client
- **React Hook Form + Zod**: forms + validation
- **Headless UI**: Dialog/Menu/Tabs primitives
- **Framer Motion**: animations
- **TanStack Table**: tables (dashboard demo)
- **Husky + lint-staged**: pre-commit checks
- **ESLint + Prettier**: code quality/formatting

## Requirements

- Node **20+**
- npm (recommended)

## Setup

1. Install dependencies:

```bash
cd alrahma-front
npm install
```

2. Create env file:

- Copy `env.example` → `.env.local`
- Set a secure `NEXTAUTH_SECRET`

```bash
copy env.example .env.local
```

3. Add brand assets (required for the auth screens):

- `public/brand/logo.png`
- `public/brand/auth-bg.jpg`

4. Run dev server:

```bash
npm run dev
```

Open `http://localhost:3001` (frontend runs on port 3001, backend on port 3000).

## Scripts

- `npm run dev`: start dev server (Turbopack)
- `npm run build`: production build
- `npm run start`: start production server
- `npm run lint`: run ESLint
- `npm run lint:fix`: fix ESLint issues where possible
- `npm run format`: format with Prettier
- `npm run format:check`: check formatting

## Routes

- `/` Home (marketing)
- `/login` Login (RTL + Arabic)
- `/signup` Sign up (RTL + Arabic)
- `/dashboard` Dashboard (protected by NextAuth middleware)
- `/profile` Profile (protected)
- `/settings` Settings (protected, includes dark mode toggle)

## Folder structure

- `src/app/`: Next.js App Router routes/layouts
  - `src/app/(marketing)/`: public pages
  - `src/app/(auth)/`: auth pages and shared auth UI
  - `src/app/(app)/`: protected app pages
  - `src/app/api/`: route handlers (NextAuth)
- `src/components/`: reusable UI + layout components
  - `src/components/ui/`: Tailwind primitives (Button/Input/Card/Modal/Dropdown/Tabs, etc.)
  - `src/components/layout/`: app shell/top nav/theme toggle
- `src/store/`: Redux store + slices
- `src/services/`: Axios + API client patterns + query keys
- `src/schemas/`: Zod schemas (forms)
- `src/types/`: TypeScript module augmentations/types (e.g. NextAuth)
- `styles/`: global styles and Tailwind entry (`styles/globals.css`)

## Auth notes (placeholder)

- NextAuth is configured with a **Credentials** provider that accepts any non-empty email/password (demo behavior).
- Replace the `authorize()` body in `auth.ts` to call your backend (e.g. `/auth/login`) and return a real user.

## Backend integration

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to point the frontend to your backend (default: `http://localhost:3000`).

**Port Configuration:**

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`
- The frontend automatically connects to the backend on port 3000 via `NEXT_PUBLIC_API_BASE_URL`.

## Figma Design Implementation

**📋 IMPORTANT:** When implementing designs from Figma, refer to the comprehensive design system guide:

- **Full Guide:** [`docs/FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md`](./docs/FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md)
- **Quick Reference:** [`docs/FIGMA_QUICK_REFERENCE.md`](./docs/FIGMA_QUICK_REFERENCE.md)

### Key Points:

- Use Alexandria font with weights [400, 500, 600, 700]
- Navbar items use `font-weight: 500` (NOT 400)
- Line-heights must match Figma exactly (e.g., 26px for navbar, not 24px)
- Container max-width: 1280px with 320px horizontal padding
- RTL layout: Add `dir="rtl"` to HTML tag
- Use exact color hex values from the design system

**For Cursor AI:** When importing Figma designs, always reference the guide first to ensure pixel-perfect implementation.
