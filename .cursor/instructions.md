# Al-Rahma Donation Platform - Cursor Instructions

## Project Overview
A Next.js donation platform for Al-Rahma charity organization. Arabic RTL interface with modern design.

## Tech Stack
- **Framework:** Next.js 15.5.7 (App Router)
- **Language:** TypeScriptv
- **Styling:** Tailwind CSS + Global CSS tokens
- **State:** Redux Toolkit (favorites), React Query (data fetching)
- **UI Components:** Custom components with Tailwind

---

## Project Structure

```
src/
├── app/                    # Next.js routes
│   └── (marketing)/        # Public-facing pages
│       └── projects/       # Projects listing
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── icons/          # SVG icon components
│   │   ├── buttons/        # Button variants
│   │   └── forms/          # Form components
│   └── layout/             # Layout components
├── features/               # Feature modules
│   ├── projects/           # Project-related components
│   │   ├── components/
│   │   │   ├── project-details/  # Subcomponents for details page
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ...
│   │   ├── types.ts
│   │   └── utils.ts
│   └── donations/          # Donation-related components
├── config/                 # Configuration files
│   └── design-tokens.ts    # Centralized design values
├── lib/                    # Utilities
├── services/               # API services
└── store/                  # Redux store
```

---

## Design Tokens

### Colors (use these instead of hard-coded hex values)

```typescript
// Primary brand color
'alrahma-primary'     // #007F5E - main green
'brand-700'           // #056A4F - hover state

// Secondary
'alrahma-secondary'   // #B4BB5F - accent yellow-green

// Text colors
'alrahma-dark'        // #0D0D0D
'alrahma-paragraph'   // rgba(13,13,13,0.7)
```

### Component Classes (defined in globals.css)

```css
.card-title        /* Project card titles */
.card-description  /* Card description text */
.card-stats        /* Statistics text in cards */
.card-badge        /* Category badges */
.card-button       /* Card action buttons */
.section-title-large /* Large section headings */
```

---

## Coding Guidelines

### 1. Component Structure
```typescript
// ✅ GOOD: Small, focused components
export function ProjectCard({ project, onDonate }: Props) {
  // 1. Hooks first
  const [state, setState] = useState();
  
  // 2. Derived values
  const progress = calculateProgress(project);
  
  // 3. Handlers
  const handleClick = () => {};
  
  // 4. Render
  return <div>...</div>;
}

// ❌ BAD: Massive components with multiple responsibilities
```

### 2. Icon Components
Always use extracted icon components:
```typescript
// ✅ GOOD
import { HeartIcon } from "@/components/ui/icons/HeartIcon";
<HeartIcon isFilled={isFav} />

// ❌ BAD - inline SVG
<svg xmlns="http://www.w3.org/2000/svg">...</svg>
```

### 3. Button Components
Use the DonateButton component for donation CTAs:
```typescript
// ✅ GOOD
import { DonateButton } from "@/components/ui/DonateButton";
<DonateButton onClick={handleDonate} variant="primary" />

// ❌ BAD - inline button with repeated styles
<button className="bg-[#007F5E] hover:bg-[#056A4F] ...">
```

### 4. Design Tokens
Import from config instead of hard-coding:
```typescript
// ✅ GOOD
import { COLORS, DONATION } from "@/config/design-tokens";
const amounts = DONATION.presetAmounts;

// ❌ BAD
const PRESET_AMOUNTS = [10, 50, 100, 200];
```

### 5. Naming Conventions
```typescript
// Event handlers: handle + Action
const handleToggleFavorite = () => {};
const handleDonate = () => {};

// Boolean state: is/has prefix
const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
const [hasError, setHasError] = useState(false);

// Components: PascalCase
ProjectCard, DonateButton, HeartIcon
```

---

## Common Patterns

### Favorite Toggle with Animation
```typescript
const handleToggleFavorite = (id: string) => {
  const wasFavorite = favorites[id];
  dispatch(toggleFavorite(id));
  
  if (!wasFavorite) {
    setFavoriteBursts(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setFavoriteBursts(prev => ({ ...prev, [id]: false }));
    }, ANIMATION.burstDuration);
  }
};
```

### Project Progress Calculation
```typescript
import { calculateProgress } from "@/features/projects/utils";
const progress = calculateProgress(project.collected, project.goal);
```

### Donation Dialog Pattern
```typescript
const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

// Open dialog
<DonateButton onClick={() => setIsDonationDialogOpen(true)} />

// Dialog component
<DonationFormDialog
  open={isDonationDialogOpen}
  onClose={() => setIsDonationDialogOpen(false)}
  onSuccess={() => setIsSuccessModalOpen(true)}
/>
```

---

## File Organization Rules

1. **Max 200 lines per component** - Split if larger
2. **One component per file** - No multiple exports
3. **Group related files** - Use folders for complex features
4. **Shared components in `components/ui/`**
5. **Feature-specific in `features/[feature]/components/`**

---

## RTL Support

All components support RTL by default:
```typescript
<div dir="rtl">
  {/* Content flows right-to-left */}
</div>
```

Use logical properties when possible:
```css
/* ✅ GOOD */
margin-inline-start: 1rem;

/* ❌ AVOID */
margin-left: 1rem;
```

---

## Quick Reference

| Task | Location |
|------|----------|
| Add new icon | `src/components/ui/icons/` |
| Add new button variant | `src/components/ui/DonateButton.tsx` |
| Update colors | `tailwind.config.ts` → `extend.colors` |
| Update typography | `styles/globals.css` → `@layer components` |
| Add project feature | `src/features/projects/` |
| Add donation feature | `src/features/donations/` |
