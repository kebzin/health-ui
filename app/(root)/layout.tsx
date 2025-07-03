import { Providers } from "@/components/providers";
import { AppSidebar } from "@/components/sidebar_topBar/app-sidebar";
import { SiteHeader } from "@/components/sidebar_topBar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

import { Nunito } from "next/font/google";
import { Separator } from "@/components/ui/separator";
const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className}  font-sans antialiased `}>
        <Providers>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 55)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset className="overflow-hidden bg-slate-50 dark:bg-slate-900"> {/* Added bg-slate-50 */}
              <SiteHeader />
              <Separator />
              <div className="p-5 overflow-y-auto h-[calc(100vh-var(--header-height))]">{children}</div> {/* Added overflow-y-auto and height */}
            </SidebarInset>
          </SidebarProvider>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
