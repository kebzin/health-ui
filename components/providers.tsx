"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Optional: Create a small component to encapsulate hooks with effects if Providers gets complex.
// For just one hook, calling it directly in Providers is fine too.

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
