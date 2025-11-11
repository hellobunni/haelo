import type { Metadata } from "next";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/command-palette";
import SiteFooter from "@/components/layout/site-footer/site-footer";
import SiteHeader from "@/components/layout/site-header/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";

export const metadata: Metadata = {
  title: "Haelo Studios",
  description:
    "We craft elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Haelo Studios",
    description:
      "We craft elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
    url: siteUrl,
    siteName: "Haelo Studios",
    images: [
      {
        url: DARK_LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Haelo Studios Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haelo Studios",
    description:
      "We craft elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
    images: [DARK_LOGO_URL],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Analytics />
            <Toaster />
            <CommandPalette />
            <StyleTokens />
            {/* Client header with its own state */}
            <SiteHeader />
            {/* Page content (route transitions handled in app/template.tsx) */}
            <main className="pt-20">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function StyleTokens() {
  return (
    <style>{`
      :root {
        --periwinkle: #9381ff;
      }
      .text-periwinkle { color: var(--periwinkle); }
      .bg-periwinkle { background-color: var(--periwinkle); }
      .section-heading { font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 700; letter-spacing: -0.05em; line-height: 1; }
      .sub-heading { font-size: clamp(2rem, 6vw, 4rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
      .list-item-heading { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; }
      .layered-heading { font-size: clamp(3rem, 10vw, 7rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; position: relative; color: var(--foreground); }
      .layered-heading span { position: absolute; top: 0; left: 0; color: var(--periwinkle); transform: translate(3px, 3px); z-index: -1; -webkit-text-stroke: 0; }
    `}</style>
  );
}
