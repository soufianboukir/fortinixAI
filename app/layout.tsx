import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-toggle";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { LayoutContent } from "./(root)/layout";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FortinixAI",
  description:
    "Real-time AI voice interview platform that simulates live interviews using intelligent voice agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
            <div className='flex md:mx-20 border-l dark:border-l-white/20 border-l-black/20 border-r border-r-black/20 dark:border-r-white/20'>
              <SidebarProvider>
                <LayoutContent>
                    {children}
                </LayoutContent>
              </SidebarProvider>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
