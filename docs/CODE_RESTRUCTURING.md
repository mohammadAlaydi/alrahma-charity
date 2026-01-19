# Code Restructuring Summary

## Overview
This document outlines the architectural improvements made to the Alrahma Charity application to enhance code maintainability, scalability, and developer experience.

## Key Improvements

### 1. **Centralized Configuration** (`src/config/constants.ts`)
**Problem:** Magic strings and numbers scattered throughout the codebase.
**Solution:** All constants centralized in one location.

**Benefits:**
- Easy to update configuration across the app
- Better type safety with `as const` assertions
- Single source of truth for routes, messages, and settings

**Usage:**
\`\`\`typescript
import { ROUTES, ERROR_MESSAGES, HTTP_STATUS } from '@/config/constants';

// Before: '/dashboard'
// After:
router.push(ROUTES.DASHBOARD);

// Before: 'خطأ في الاتصال'
// After:
toast.error({ message: ERROR_MESSAGES.NETWORK_ERROR });
\`\`\`

### 2. **Storage Service** (`src/lib/storage.ts`)
**Problem:** Direct localStorage calls scattered everywhere, SSR issues, no error handling.
**Solution:** Type-safe storage abstraction with SSR safety.

**Benefits:**
- SSR/SSG safe (checks for browser environment)
- Centralized error handling
- Type-safe get/set operations
- Specialized token storage methods

**Usage:**
\`\`\`typescript
import { storage, tokenStorage } from '@/lib/storage';

// Token management
tokenStorage.setTokens(accessToken, refreshToken);
const token = tokenStorage.getAccessToken();
tokenStorage.clearTokens();

// Generic storage
storage.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
const prefs = storage.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
\`\`\`

### 3. **Environment Variable Validation** (`src/lib/env.ts`)
**Problem:** No runtime validation of environment variables.
**Solution:** Zod-based validation on app startup.

**Benefits:**
- Catches missing/invalid env vars early
- Type-safe access to environment variables
- Clear error messages for misconfiguration

**Usage:**
\`\`\`typescript
import { env, isDevelopment } from '@/lib/env';

const apiUrl = env.NEXT_PUBLIC_API_BASE_URL;
if (isDevelopment) {
  console.log('Debug info...');
}
\`\`\`

### 4. **Custom Hooks** (`src/hooks/`)

#### `useToast`
Simplified toast/notification management.

\`\`\`typescript
import { useToast } from '@/hooks';

const toast = useToast();

toast.success({ message: 'تم الحفظ بنجاح' });
toast.error({ message: 'حدث خطأ' });
toast.info({ message: 'معلومة مهمة' });
\`\`\`

#### `useAuth`
Unified authentication interface combining NextAuth and custom auth.

\`\`\`typescript
import { useAuth } from '@/hooks';

const { isAuthenticated, user, loginWithNextAuth, logout } = useAuth();

// Login
await loginWithNextAuth(email, password);

// Logout
await logout();

// Require authentication (redirect if not logged in)
useEffect(() => {
  requireAuth();
}, [requireAuth]);
\`\`\`

#### `useFavorites`
Simplified favorites management.

\`\`\`typescript
import { useFavorites } from '@/hooks';

const { isFavorite, toggleFavorite } = useFavorites();

const handleClick = () => toggleFavorite(projectId);
const favIcon = isFavorite(projectId) ? '❤️' : '🤍';
\`\`\`

### 5. **Unified Type System** (`src/types/`)
**Problem:** Duplicate type definitions across files.
**Solution:** Single source of truth for all types.

**Benefits:**
- No type inconsistencies
- Easy to refactor
- Better IDE autocomplete

**Structure:**
- `types/auth.ts` - All authentication types
- `types/api.ts` - API response types
- `types/index.ts` - Central export point

### 6. **Utility Functions** (`src/lib/`)

#### Validation (`src/lib/validation.ts`)
\`\`\`typescript
import { isValidEmail, isValidPassword } from '@/lib/validation';

if (!isValidEmail(email)) {
  // Handle invalid email
}
\`\`\`

#### Formatting (`src/lib/format.ts`)
\`\`\`typescript
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/format';

formatCurrency(5000); // "٥٬٠٠٠ ر.س"
formatDate(new Date()); // "١٣ يناير ٢٠٢٦"
formatRelativeTime(yesterday); // "منذ يوم"
\`\`\`

#### General Utils (`src/lib/utils.ts`)
\`\`\`typescript
import { debounce, throttle, unique, groupBy } from '@/lib/utils';

const debouncedSearch = debounce(search, 300);
const uniqueIds = unique([1, 2, 2, 3, 3]); // [1, 2, 3]
const grouped = groupBy(items, 'category');
\`\`\`

### 7. **Error Logging** (`src/lib/errorLogger.ts`)
**Problem:** Inconsistent error handling, no centralized logging.
**Solution:** Unified error logging service.

**Benefits:**
- Centralized error tracking
- Severity levels
- Production-ready (easy to integrate Sentry, LogRocket, etc.)

**Usage:**
\`\`\`typescript
import { errorLogger, handleError } from '@/lib/errorLogger';

try {
  // risky operation
} catch (error) {
  const message = handleError(error, 'حدث خطأ في التحميل');
  toast.error({ message });
}
\`\`\`

## Migration Guide

### Updating Existing Components

#### Before:
\`\`\`typescript
"use client";
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToast } from '@/store/slices/notificationsSlice';

export default function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    localStorage.setItem('token', 'abc123');
    dispatch(addToast({ 
      type: 'success', 
      message: 'تم الحفظ بنجاح' 
    }));
  };
  
  return <button onClick={handleClick}>حفظ</button>;
}
\`\`\`

#### After:
\`\`\`typescript
"use client";
import { useToast } from '@/hooks';
import { tokenStorage } from '@/lib/storage';
import { SUCCESS_MESSAGES } from '@/config/constants';

export default function MyComponent() {
  const toast = useToast();
  
  const handleClick = () => {
    tokenStorage.setAccessToken('abc123');
    toast.success({ message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  };
  
  return <button onClick={handleClick}>حفظ</button>;
}
\`\`\`

## File Organization

\`\`\`
src/
├── config/
│   └── constants.ts          # All app constants
├── hooks/
│   ├── index.ts             # Hook exports
│   ├── useToast.ts          # Toast hook
│   ├── useAuth.ts           # Auth hook
│   └── useFavorites.ts      # Favorites hook
├── lib/
│   ├── cn.ts                # Tailwind utilities
│   ├── env.ts               # Environment validation
│   ├── storage.ts           # Storage service
│   ├── errorLogger.ts       # Error logging
│   ├── validation.ts        # Validation utils
│   ├── format.ts            # Formatting utils
│   └── utils.ts             # General utils
├── types/
│   ├── index.ts             # Type exports
│   ├── auth.ts              # Auth types
│   └── api.ts               # API types
├── services/
│   ├── http.ts              # HTTP client (updated)
│   └── api/
│       └── auth.ts          # Auth API (updated)
├── store/
│   └── slices/
│       ├── authSlice.ts     # Auth state (updated)
│       └── notificationsSlice.ts  # Notifications (updated)
└── ...
\`\`\`

## Best Practices

### 1. **Always use constants**
❌ Don't: `router.push('/dashboard')`
✅ Do: `router.push(ROUTES.DASHBOARD)`

### 2. **Use storage service**
❌ Don't: `localStorage.setItem('token', token)`
✅ Do: `tokenStorage.setAccessToken(token)`

### 3. **Use custom hooks**
❌ Don't: Direct dispatch calls for common operations
✅ Do: Use `useToast()`, `useAuth()`, `useFavorites()`

### 4. **Use utility functions**
❌ Don't: Inline validation/formatting logic
✅ Do: Import from `@/lib/validation` or `@/lib/format`

### 5. **Handle errors properly**
❌ Don't: Silent failures or console.error
✅ Do: Use `errorLogger.log()` or `handleError()`

### 6. **Type everything**
❌ Don't: Use `any` or skip type annotations
✅ Do: Import types from `@/types`

## Performance Benefits

1. **Tree-shaking**: Constants defined with `as const` allow better tree-shaking
2. **Code splitting**: Logical separation allows better chunk optimization
3. **Caching**: Centralized configuration improves bundle caching
4. **Reduced duplication**: Shared utilities reduce bundle size

## Maintainability Benefits

1. **Single source of truth**: Changes propagate automatically
2. **Better refactoring**: TypeScript ensures safe refactoring
3. **Easier testing**: Isolated utilities are easier to test
4. **Onboarding**: Clear structure helps new developers
5. **Documentation**: Self-documenting code through constants

## Next Steps

### Recommended Improvements:

1. **Add API documentation** using TSDoc comments
2. **Implement error boundary** for React error handling
3. **Add Sentry integration** in errorLogger service
4. **Create data fetching hooks** (useQuery wrappers)
5. **Add form validation hooks** using react-hook-form
6. **Implement optimistic updates** for better UX
7. **Add E2E tests** for critical flows
8. **Performance monitoring** (Web Vitals)

## Breaking Changes

### AuthTokens Type
The token field names changed from snake_case to camelCase:
- `access_token` → `accessToken`
- `refresh_token` → `refreshToken`

### Imports
Some imports need updating:
- Use `@/hooks` instead of direct imports
- Use `@/types` instead of inline type definitions
- Use constants from `@/config/constants`

## Questions?

For questions or issues with the new structure, please refer to:
1. This documentation
2. Inline code comments (TSDoc)
3. Example usage in updated files
