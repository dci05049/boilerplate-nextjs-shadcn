import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/main-nav";
import Link from "next/link";
import { marketingConfig } from "@/config/marketing";
import { Button, buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/utils/supabase/server";
import { signout } from "./login/actions";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                  <MainNav items={marketingConfig.mainNav} />
                  <nav>
                    {user !== null ? (
                      <div className="flex items-center gap-2">
                        <p>{user.email}</p>
                        <form action={signout}>
                          <Button>Sign Out</Button>
                        </form>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({ variant: "secondary", size: "sm" }),
                          "px-4"
                        )}
                      >
                        Login
                      </Link>
                    )}
                  </nav>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
