# 📋 Project Structure & Architecture Guide

## 🗂️ Directory Structure

\`\`\`
alrahma-charity/
├── docs/                          # Documentation
│   ├── CODE_RESTRUCTURING.md     # Architecture improvements guide
│   ├── CURSOR_AI_FIGMA_PROMPT.md
│   └── FIGMA_IMPLEMENTATION_GUIDE.md
│
├── public/                        # Static assets
│   ├── brand/                    # Brand assets
│   ├── figma/                    # Design system exports
│   └── images/                   # Image assets
│
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── (app)/               # Protected app pages
│   │   ├── (marketing)/         # Public marketing pages
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   └── providers.tsx        # Context providers
│   │
│   ├── components/              # Reusable components
│   │   ├── layout/              # Layout components
│   │   │   ├── AppShell.tsx
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── ...
│   │   └── ui/                  # UI components
│   │       ├── Button.tsx
│   │       ├── TextInput.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   │
│   ├── config/                  # ⭐ Configuration
│   │   └── constants.ts         # App-wide constants
│   │
│   ├── features/                # Feature modules
│   │   ├── auth/
│   │   ├── donations/
│   │   ├── projects/
│   │   ├── zakat/
│   │   └── ...
│   │
│   ├── hooks/                   # ⭐ Custom hooks
│   │   ├── index.ts            # Hook exports
│   │   ├── useAuth.ts          # Authentication
│   │   ├── useToast.ts         # Notifications
│   │   └── useFavorites.ts     # Favorites management
│   │
│   ├── lib/                     # ⭐ Utility libraries
│   │   ├── cn.ts               # Tailwind utilities
│   │   ├── env.ts              # Environment validation
│   │   ├── storage.ts          # Storage service
│   │   ├── errorLogger.ts      # Error logging
│   │   ├── validation.ts       # Validation utils
│   │   ├── format.ts           # Formatting utils
│   │   └── utils.ts            # General utilities
│   │
│   ├── schemas/                 # Validation schemas
│   │   └── auth.ts             # Auth validation (Zod)
│   │
│   ├── services/                # API services
│   │   ├── http.ts             # HTTP client
│   │   ├── api.ts              # API exports
│   │   ├── queryKeys.ts        # React Query keys
│   │   └── api/
│   │       ├── auth.ts
│   │       ├── campaigns.ts
│   │       └── donations.ts
│   │
│   ├── store/                   # Redux store
│   │   ├── store.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── dashboardSlice.ts
│   │       ├── favoritesSlice.ts
│   │       └── notificationsSlice.ts
│   │
│   └── types/                   # ⭐ Type definitions
│       ├── index.ts            # Type exports
│       ├── auth.ts             # Auth types
│       ├── api.ts              # API types
│       └── next-auth.d.ts      # NextAuth types
│
├── styles/
│   └── globals.css             # Global styles
│
├── .env.example                # Environment template
├── auth.ts                     # NextAuth config
├── middleware.ts               # Next.js middleware
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
└── tsconfig.json               # TypeScript config
\`\`\`

## 🏗️ Architecture Patterns

### 1. **Separation of Concerns**
- **Components**: Pure UI components
- **Hooks**: Reusable stateful logic
- **Services**: API communication
- **Store**: Global state management
- **Utils**: Pure functions

### 2. **Feature-Based Organization**
Each feature has its own directory:
\`\`\`
features/donations/
├── components/          # Feature-specific components
├── hooks/              # Feature-specific hooks (optional)
├── types/              # Feature-specific types (optional)
└── utils/              # Feature-specific utilities (optional)
\`\`\`

### 3. **Smart vs Dumb Components**
- **Smart (Container)**: Manage state, side effects
- **Dumb (Presentational)**: Pure UI, props only

## 🔑 Key Concepts

### Configuration Management
\`\`\`typescript
// ❌ Bad - Magic strings
const apiUrl = "http://localhost:3000/api/v1";
router.push("/dashboard");

// ✅ Good - Constants
import { API_CONFIG, ROUTES } from '@/config/constants';
const apiUrl = \`\${API_CONFIG.BASE_URL}/api/\${API_CONFIG.VERSION}\`;
router.push(ROUTES.DASHBOARD);
\`\`\`

### Storage Management
\`\`\`typescript
// ❌ Bad - Direct localStorage
localStorage.setItem('token', token);
const token = localStorage.getItem('token');

// ✅ Good - Storage service
import { tokenStorage } from '@/lib/storage';
tokenStorage.setAccessToken(token);
const token = tokenStorage.getAccessToken();
\`\`\`

### Error Handling
\`\`\`typescript
// ❌ Bad - Silent failure
try {
  await api.call();
} catch (error) {
  console.error(error);
}

// ✅ Good - Proper handling
import { handleError } from '@/lib/errorLogger';
try {
  await api.call();
} catch (error) {
  const message = handleError(error, 'حدث خطأ في التحميل');
  toast.error({ message });
}
\`\`\`

### Type Safety
\`\`\`typescript
// ❌ Bad - Inline types
function login(user: { email: string; password: string }) {}

// ✅ Good - Centralized types
import { LoginRequest } from '@/types/auth';
function login(credentials: LoginRequest) {}
\`\`\`

## 🎯 Development Workflow

### 1. **Adding a New Feature**
1. Create feature directory in `src/features/`
2. Add types in `src/types/` if needed
3. Create components in `features/<name>/components/`
4. Add API service if needed
5. Create custom hook if reusable logic exists
6. Update constants if new routes/messages needed

### 2. **Adding a New Component**
1. Decide: UI component or feature-specific?
2. UI → `src/components/ui/`
3. Feature → `src/features/<name>/components/`
4. Export from appropriate index file

### 3. **Adding a New API Endpoint**
1. Define types in `src/types/`
2. Create service function in `src/services/api/`
3. Add query keys to `src/services/queryKeys.ts`
4. Export from `src/services/api.ts`

## 🔧 Utility Usage

### Validation
\`\`\`typescript
import { isValidEmail, isValidPassword } from '@/lib/validation';

if (!isValidEmail(email)) {
  setError('Invalid email');
}
\`\`\`

### Formatting
\`\`\`typescript
import { formatCurrency, formatDate } from '@/lib/format';

const price = formatCurrency(5000);     // "٥٬٠٠٠ ر.س"
const date = formatDate(new Date());    // "١٣ يناير ٢٠٢٦"
\`\`\`

### General Utils
\`\`\`typescript
import { debounce, unique, groupBy } from '@/lib/utils';

const debouncedFn = debounce(handleSearch, 300);
const uniqueItems = unique([1, 2, 2, 3]);
const grouped = groupBy(items, 'category');
\`\`\`

## 📝 Naming Conventions

### Files
- Components: **PascalCase** (`Button.tsx`, `UserProfile.tsx`)
- Utilities: **camelCase** (`storage.ts`, `validation.ts`)
- Constants: **camelCase** (`constants.ts`, `queryKeys.ts`)
- Hooks: **camelCase** with `use` prefix (`useAuth.ts`)

### Variables
- **camelCase**: Regular variables, functions
- **PascalCase**: Components, classes, types
- **SCREAMING_SNAKE_CASE**: True constants (rare, prefer `as const`)

### Components
\`\`\`typescript
// Feature/Page components
export default function LoginPage() {}

// Reusable components
export const Button = () => {}
export function TextInput() {}
\`\`\`

## 🚀 Performance Tips

1. **Use constants**: Better tree-shaking and caching
2. **Lazy load routes**: Use dynamic imports for routes
3. **Memoize expensive computations**: useMemo, useCallback
4. **Optimize images**: Use Next.js Image component
5. **Code splitting**: Keep components small and focused

## 🧪 Testing Strategy

### Unit Tests
- Utility functions (`lib/`)
- Custom hooks (`hooks/`)
- Redux slices (`store/slices/`)

### Integration Tests
- API services (`services/api/`)
- Complex components with state

### E2E Tests
- Critical user flows (login, donation, etc.)
- Payment processes

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Guide](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zod Validation](https://zod.dev/)
- [Code Restructuring Guide](./CODE_RESTRUCTURING.md)

## 🤝 Contributing

1. Follow existing patterns and conventions
2. Use TypeScript strictly (no `any`)
3. Add JSDoc comments for complex logic
4. Keep components small and focused
5. Test your changes
6. Update documentation when needed

## ⚡ Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Format code
npm run format

# Build for production
npm run build
\`\`\`

## 📞 Support

For architectural questions, refer to:
1. [CODE_RESTRUCTURING.md](./CODE_RESTRUCTURING.md)
2. Inline code documentation
3. Team lead or senior developers
