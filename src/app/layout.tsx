import type { Metadata } from "next";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/shared/command-palette";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/shared/gtm";
import { Toaster } from "@/components/ui/sonner/sonner";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
  renderJsonLdScript,
} from "@/lib/seo/schema";
import { DARK_LOGO_URL } from "@/lib/utils";
import ConditionalHeaderFooter from "./conditional-header-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";

export const metadata: Metadata = {
  title: "Haelo Studios",
  description:
    "Crafting elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Haelo Studios",
    description:
      "Crafting elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
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
      "Crafted elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
    images: [DARK_LOGO_URL],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Generate Organization Schema
  const organizationSchema = generateOrganizationSchema({
    name: "Haelo Studios",
    url: siteUrl,
    logo: DARK_LOGO_URL,
    description:
      "Crafting elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
    socialProfiles: [
      "https://linkedin.com/in/bryannagardner",
      "https://instagram.com/haelostudios",
      "https://github.com/hellobunni",
      "https://x.com/haelostudios",
      "https://facebook.com/haelostudios",
      "https://youtube.com/@haelostudios",
    ],
    email: "hello@haelostudios.com",
    phone: "(248) 250-3816",
    address: {
      street: "Remote Studio",
      city: "United States",
      country: "USA",
    },
  });

  // Generate Person/Identity Schema for founder
  const personSchema = generatePersonSchema({
    name: "Bryanna Gardner",
    jobTitle: "Founder & Lead Engineer",
    url: siteUrl,
    email: "hello@haelostudios.com",
    socialProfiles: [
      "https://linkedin.com/in/bryannagardner",
      "https://instagram.com/haelostudios",
      "https://github.com/hellobunni",
    ],
    worksFor: {
      name: "Haelo Studios",
      url: siteUrl,
    },
  });

  // Generate LocalBusiness Schema
  const localBusinessSchema = generateLocalBusinessSchema({
    name: "Haelo Studios",
    url: siteUrl,
    logo: DARK_LOGO_URL,
    description:
      "Premium digital design and development studio crafting thoughtful, high-impact web experiences.",
    telephone: "(248) 250-3816",
    email: "hello@haelostudios.com",
    address: {
      street: "Remote Studio",
      city: "United States",
      country: "USA",
    },
    socialProfiles: [
      "https://linkedin.com/in/bryannagardner",
      "https://instagram.com/haelostudios",
      "https://github.com/hellobunni",
      "https://x.com/haelostudios",
      "https://facebook.com/haelostudios",
      "https://youtube.com/@haelostudios",
    ],
  });

  // Generate WebSite Schema
  const websiteSchema = generateWebSiteSchema({
    name: "Haelo Studios",
    url: siteUrl,
    description:
      "Premium digital design and development studio crafting thoughtful, high-impact web experiences.",
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-foreground font-sans antialiased">
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is safe, content is controlled
          dangerouslySetInnerHTML={{
            __html: renderJsonLdScript(organizationSchema),
          }}
        />
        {/* Person/Identity Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is safe, content is controlled
          dangerouslySetInnerHTML={{
            __html: renderJsonLdScript(personSchema),
          }}
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is safe, content is controlled
          dangerouslySetInnerHTML={{
            __html: renderJsonLdScript(localBusinessSchema),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is safe, content is controlled
          dangerouslySetInnerHTML={{
            __html: renderJsonLdScript(websiteSchema),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Analytics />
            <SpeedInsights />
            {gaId && <GoogleAnalytics gaId={gaId} />}
            <Toaster />
            <CommandPalette />
            <ConditionalHeaderFooter>{children}</ConditionalHeaderFooter>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
