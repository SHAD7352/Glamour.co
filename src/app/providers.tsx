"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./QueryProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
