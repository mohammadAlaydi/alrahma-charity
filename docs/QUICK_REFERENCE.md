# 🚀 Quick Reference Guide

## Common Patterns

### 🔐 Authentication

#### Login
\`\`\`typescript
import { useAuth } from '@/hooks';

function LoginComponent() {
  const { loginWithNextAuth, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const success = await loginWithNextAuth(email, password);
    if (success) {
      // Redirected automatically to dashboard
    }
  };
}
\`\`\`

#### Logout
\`\`\`typescript
const { logout } = useAuth();

const handleLogout = async () => {
  await logout(); // Clears tokens and redirects to login
};
\`\`\`

#### Check Auth Status
\`\`\`typescript
const { isAuthenticated, user, isLoading } = useAuth();

if (isLoading) return <LoadingSpinner />;
if (!isAuthenticated) return <LoginPrompt />;

return <div>Welcome, {user?.name}</div>;
\`\`\`

#### Require Authentication
\`\`\`typescript
import { useEffect } from 'react';
import { useAuth } from '@/hooks';

function ProtectedPage() {
  const { requireAuth } = useAuth();

  useEffect(() => {
    requireAuth(); // Redirects to login if not authenticated
  }, [requireAuth]);

  return <div>Protected Content</div>;
}
\`\`\`

### 🔔 Toast Notifications

\`\`\`typescript
import { useToast } from '@/hooks';

function MyComponent() {
  const toast = useToast();

  // Success
  toast.success({ message: 'تم الحفظ بنجاح' });

  // Error
  toast.error({ message: 'حدث خطأ' });

  // Info
  toast.info({ message: 'معلومة مهمة' });

  // Warning
  toast.warning({ message: 'تحذير' });

  // Custom duration
  toast.success({ 
    message: 'سيختفي بعد 5 ثواني',
    durationMs: 5000 
  });

  // With title
  toast.success({ 
    title: 'نجاح',
    message: 'تم إكمال العملية' 
  });
}
\`\`\`

### ❤️ Favorites

\`\`\`typescript
import { useFavorites } from '@/hooks';

function ProjectCard({ projectId }: { projectId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(projectId)}>
      {isFavorite(projectId) ? '❤️' : '🤍'}
    </button>
  );
}
\`\`\`

### 💾 Storage

\`\`\`typescript
import { storage, tokenStorage } from '@/lib/storage';
import { STORAGE_KEYS } from '@/config/constants';

// Tokens
tokenStorage.setAccessToken('token');
tokenStorage.setRefreshToken('token');
tokenStorage.setTokens('access', 'refresh');
tokenStorage.clearTokens();

const token = tokenStorage.getAccessToken();
const hasTokens = tokenStorage.hasTokens();

// Generic storage
storage.set(STORAGE_KEYS.USER_PREFERENCES, { theme: 'dark' });
const prefs = storage.get(STORAGE_KEYS.USER_PREFERENCES);
storage.remove(STORAGE_KEYS.USER_PREFERENCES);
storage.clear();
\`\`\`

### 🛣️ Navigation

\`\`\`typescript
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/constants';

function MyComponent() {
  const router = useRouter();

  // Navigate
  router.push(ROUTES.DASHBOARD);
  router.push(ROUTES.LOGIN);
  router.push(ROUTES.PROJECTS);

  // Navigate with query params
  router.push(\`\${ROUTES.PROJECTS}?category=education\`);
}
\`\`\`

### ✅ Validation

\`\`\`typescript
import { isValidEmail, isValidPassword, isValidPhone } from '@/lib/validation';
import { ERROR_MESSAGES } from '@/config/constants';

function validateForm(data: FormData) {
  if (!isValidEmail(data.email)) {
    return { error: ERROR_MESSAGES.EMAIL_INVALID };
  }

  if (!isValidPassword(data.password)) {
    return { error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }

  if (data.phone && !isValidPhone(data.phone)) {
    return { error: 'رقم الهاتف غير صحيح' };
  }

  return { success: true };
}
\`\`\`

### 🎨 Formatting

\`\`\`typescript
import { formatCurrency, formatDate, formatRelativeTime, truncate } from '@/lib/format';

// Currency
formatCurrency(5000); // "٥٬٠٠٠ ر.س"

// Date
formatDate(new Date()); // "١٣ يناير ٢٠٢٦"
formatDate(new Date(), { month: 'short', day: 'numeric' }); // "١٣ يناير"

// Relative time
formatRelativeTime(yesterday); // "منذ يوم"
formatRelativeTime(twoHoursAgo); // "منذ ساعتين"

// Truncate
truncate('Long text here', 20); // "Long text here..."
\`\`\`

### 🛠️ Utility Functions

\`\`\`typescript
import { debounce, throttle, unique, groupBy } from '@/lib/utils';

// Debounce (wait for user to stop typing)
const debouncedSearch = debounce((query: string) => {
  search(query);
}, 300);

// Throttle (limit calls per time period)
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// Remove duplicates
const uniqueIds = unique([1, 2, 2, 3, 3]); // [1, 2, 3]

// Group by property
const grouped = groupBy(projects, 'category');
// { education: [...], health: [...] }
\`\`\`

### ⚠️ Error Handling

\`\`\`typescript
import { handleError, errorLogger } from '@/lib/errorLogger';
import { useToast } from '@/hooks';

function MyComponent() {
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await api.submitForm(data);
      toast.success({ message: 'تم الإرسال بنجاح' });
    } catch (error) {
      const message = handleError(error, 'حدث خطأ في الإرسال');
      toast.error({ message });
    }
  };

  // Manual logging
  errorLogger.log(new Error('Something went wrong'), 'high', {
    userId: user.id,
    action: 'submit_form'
  });
}
\`\`\`

### 🌍 Environment Variables

\`\`\`typescript
import { env, isDevelopment, isProduction } from '@/lib/env';

// Access validated env vars
const apiUrl = env.NEXT_PUBLIC_API_BASE_URL;

// Conditional logic
if (isDevelopment) {
  console.log('Debug info...');
}

if (isProduction) {
  // Production-only code
}
\`\`\`

### 📡 API Calls

\`\`\`typescript
import { login, register } from '@/services/api/auth';
import { getCampaigns } from '@/services/api/campaigns';
import type { LoginRequest } from '@/types/auth';

async function handleLogin() {
  try {
    const credentials: LoginRequest = {
      email: 'user@example.com',
      password: 'password123'
    };

    const response = await login(credentials);
    // response.user
    // response.tokens
  } catch (error) {
    // Error already logged and formatted
  }
}
\`\`\`

### 🎯 React Query

\`\`\`typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/services/queryKeys';
import { getCampaigns } from '@/services/api/campaigns';

function CampaignsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.campaigns.list({ page: 1, limit: 10 }),
    queryFn: () => getCampaigns({ page: 1, limit: 10 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaigns</div>;

  return <div>{data.map(campaign => ...)}</div>;
}
\`\`\`

### 🎨 Styling with Constants

\`\`\`typescript
import { cn } from '@/lib/cn';

function Button({ primary, className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg',
        primary ? 'bg-blue-500 text-white' : 'bg-gray-200',
        className
      )}
    >
      Click me
    </button>
  );
}
\`\`\`

## File Organization

### Where to Put New Code

| Type | Location | Example |
|------|----------|---------|
| New UI component | \`src/components/ui/\` | Button, Card, Input |
| Feature component | \`src/features/<feature>/components/\` | LoginForm, DonationCard |
| Custom hook | \`src/hooks/\` | useAuth, useToast |
| Utility function | \`src/lib/\` | validation, format, utils |
| Type definition | \`src/types/\` | auth.ts, api.ts |
| API service | \`src/services/api/\` | auth.ts, campaigns.ts |
| Constant | \`src/config/constants.ts\` | Routes, messages, config |
| Redux slice | \`src/store/slices/\` | authSlice.ts |
| Page | \`src/app/(group)/\` | (auth)/login/page.tsx |

## Common Mistakes to Avoid

### ❌ Don't
\`\`\`typescript
// Direct localStorage
localStorage.setItem('token', token);

// Magic strings
router.push('/dashboard');

// Hardcoded messages
toast.error({ message: 'خطأ في الاتصال' });

// Inline validation
if (email.includes('@')) { ... }

// No error handling
await api.call();
\`\`\`

### ✅ Do
\`\`\`typescript
// Use storage service
tokenStorage.setAccessToken(token);

// Use constants
router.push(ROUTES.DASHBOARD);

// Use constant messages
toast.error({ message: ERROR_MESSAGES.NETWORK_ERROR });

// Use validation utils
if (isValidEmail(email)) { ... }

// Handle errors
try {
  await api.call();
} catch (error) {
  handleError(error);
}
\`\`\`

## Import Shortcuts

\`\`\`typescript
// Hooks
import { useAuth, useToast, useFavorites } from '@/hooks';

// Types
import type { AuthUser, LoginRequest } from '@/types';

// Utils
import { formatCurrency, isValidEmail } from '@/lib/format';
import { storage, tokenStorage } from '@/lib/storage';
import { debounce, unique } from '@/lib/utils';

// Constants
import { ROUTES, ERROR_MESSAGES, STORAGE_KEYS } from '@/config/constants';

// API
import { login, register } from '@/services/api';
import { queryKeys } from '@/services/queryKeys';
\`\`\`

## Tips & Tricks

### 1. Type Safety
Always import types from \`@/types\` for consistency.

### 2. Constants
Use constants for all routes, keys, and messages.

### 3. Error Handling
Always wrap API calls in try-catch with proper error handling.

### 4. Custom Hooks
Prefer custom hooks over direct Redux dispatch for common operations.

### 5. Storage
Always use the storage service, never direct localStorage.

### 6. Validation
Use utility functions instead of inline validation logic.

### 7. Formatting
Use formatting utilities for consistent UX.

### 8. Performance
Use debounce for search, throttle for scroll/resize events.

## Need More Help?

1. Check [CODE_RESTRUCTURING.md](./CODE_RESTRUCTURING.md) for detailed examples
2. Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture
3. Look at updated files for patterns
4. Ask team members

---

**Keep this guide handy for quick reference during development!**
