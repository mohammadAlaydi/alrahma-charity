/**
 * Custom hook for auth state management
 * Provides a unified interface for authentication operations
 */

import { useCallback } from "react";
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as reduxLogout, setAuthenticated } from "@/store/slices/authSlice";
import { tokenStorage } from "@/lib/storage";
import { ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/config/constants";
import { useToast } from "./useToast";
import type { AuthUser, AuthTokens } from "@/types/auth";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const authState = useAppSelector((state) => state.auth);

  // Check if user is authenticated (either NextAuth or custom auth)
  const isAuthenticated = status === "authenticated" || authState.status === "authenticated";
  const isLoading = status === "loading" || authState.status === "loading";

  /**
   * Login with NextAuth
   */
  const loginWithNextAuth = useCallback(
    async (email: string, password: string, callbackUrl: string = ROUTES.DASHBOARD) => {
      try {
        const result = await nextAuthSignIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          toast.error({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
          return false;
        }

        toast.success({ message: SUCCESS_MESSAGES.LOGIN_SUCCESS });
        router.push(callbackUrl);
        return true;
      } catch (error) {
        console.error("Login error:", error);
        toast.error({ message: ERROR_MESSAGES.SERVER_ERROR });
        return false;
      }
    },
    [router, toast],
  );

  /**
   * Login with custom auth (API)
   */
  const loginWithCustomAuth = useCallback(
    (user: AuthUser, tokens: AuthTokens) => {
      dispatch(setAuthenticated({ user, tokens }));
      toast.success({ message: SUCCESS_MESSAGES.LOGIN_SUCCESS });
    },
    [dispatch, toast],
  );

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    // Clear NextAuth session
    if (status === "authenticated") {
      await nextAuthSignOut({ redirect: false });
    }

    // Clear custom auth
    dispatch(reduxLogout());
    tokenStorage.clearTokens();

    toast.success({ message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
    router.push(ROUTES.LOGIN);
  }, [status, dispatch, router, toast]);

  /**
   * Require authentication - redirect to login if not authenticated
   */
  const requireAuth = useCallback(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
      toast.error({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }
  }, [isAuthenticated, isLoading, router, toast]);

  return {
    // State
    isAuthenticated,
    isLoading,
    user: session?.user ?? authState.user,
    session,
    
    // Actions
    loginWithNextAuth,
    loginWithCustomAuth,
    logout,
    requireAuth,
  };
};
