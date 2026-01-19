"use client";

import { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toast/Toaster";
import { QUERY_CONFIG } from "@/config/constants";
import { LoginProvider } from "@/contexts/LoginContext";
import { useAppDispatch } from "@/store/hooks";
import { setAuthenticated, logout } from "@/store/slices/authSlice";
import { AuthParamHandler } from "@/features/auth/components/AuthParamHandler";

function SessionSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setAuthenticated({
          user: session.user as any,
          tokens: { accessToken: "mock-token", refreshToken: "mock-refresh" },
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: QUERY_CONFIG.RETRY_COUNT,
            refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
            staleTime: QUERY_CONFIG.STALE_TIME,
            gcTime: QUERY_CONFIG.CACHE_TIME,
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <LoginProvider>
              <SessionSync>
                <AuthParamHandler />
                {children}
              </SessionSync>
              <Toaster />
            </LoginProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
