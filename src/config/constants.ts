/**
 * Application-wide constants
 * Centralized location for all magic numbers, strings, and configuration values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  VERSION: "v1",
  TIMEOUT: 30000, // 30 seconds
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_PREFERENCES: "user_preferences",
  THEME: "theme",
} as const;

// Routes
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  DONATIONS: "/donations",
  PROJECTS: "/projects",
  ZAKAT: "/zakat",
  SADAQAH: "/sadaqah",
  SADAQAH_JARIYAH: "/sadaqah-jariyah",
  KAFALAH: "/kafalah",
  
  // Auth routes
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  
  // Protected routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

// Protected route patterns for middleware
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/settings",
] as const;

// Query Configuration
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  RETRY_COUNT: 1,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const;

// Toast Configuration
export const TOAST_CONFIG = {
  DEFAULT_DURATION: 3500,
  MAX_TOASTS: 5,
  POSITION: "bottom-right",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages (Arabic)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت",
  SERVER_ERROR: "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً",
  UNAUTHORIZED: "يجب تسجيل الدخول للوصول إلى هذه الصفحة",
  FORBIDDEN: "ليس لديك صلاحية لتنفيذ هذا الإجراء",
  NOT_FOUND: "المورد المطلوب غير موجود",
  VALIDATION_ERROR: "خطأ في التحقق من البيانات",
  INVALID_CREDENTIALS: "بيانات الدخول غير صحيحة",
  EMAIL_INVALID: "البريد الإلكتروني غير صحيح",
  PASSWORD_TOO_SHORT: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  PASSWORDS_DONT_MATCH: "كلمتا المرور غير متطابقتين",
} as const;

// Success Messages (Arabic)
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "تم تسجيل الدخول بنجاح",
  LOGOUT_SUCCESS: "تم تسجيل الخروج بنجاح",
  SIGNUP_SUCCESS: "تم إنشاء الحساب بنجاح",
  UPDATE_SUCCESS: "تم التحديث بنجاح",
  DELETE_SUCCESS: "تم الحذف بنجاح",
  DONATION_SUCCESS: "تم التبرع بنجاح. شكراً لكرمك",
} as const;
