import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/types";
import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Métadonnées en FR par défaut (générées au build statique). La bascule
// de langue côté client ne change pas les balises <head> — accepté pour
// un portfolio. Pour SEO multi-langue, faudrait passer en routes /fr /en.
const baseDict = dictionaries[defaultLocale];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: baseDict.meta.title,
    template: `%s · ${site.name}`,
  },
  description: baseDict.meta.description,
  keywords: [
    "Ryan Avril",
    "portfolio",
    "développeur",
    "developer",
    "BUT Informatique",
    "Computer Science",
    "Nice",
    "alternance",
    "apprenticeship",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: site.url,
    title: baseDict.meta.title,
    description: baseDict.meta.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseDict.meta.title,
    description: baseDict.meta.description,
    creator: "@ryanavril",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning : next-themes ET LocaleProvider modifient
    // l'arbre côté client avant l'hydratation → on évite le warning de
    // mismatch sur <html>.
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      // Next.js 16 ne touche plus à scroll-behavior par défaut. On signale
      // explicitement qu'on veut smooth scroll pendant les transitions.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-(--background) text-(--foreground) font-sans">
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
