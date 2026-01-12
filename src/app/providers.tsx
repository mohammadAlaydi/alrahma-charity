"use client";

import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { store } from "@/store/store";
import { Toaster } from "@/components/ui/toast/Toaster";
import { QUERY_CONFIG } from "@/config/constants";

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
            {children}
            <Toaster />
          </ReduxProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
