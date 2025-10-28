"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./QueryProvider"; // 1. Import your QueryProvider
import { AuthProvider } from "@/hooks/useAuth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // 2. Wrap your app in QueryProvider
    <QueryProvider>
      {/* 3. Nest ThemeProvider inside (or outside, order doesn't matter here) */}
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
