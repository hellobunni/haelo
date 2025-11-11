import type { Metadata } from "next";
import AboutPage from "@/components/pages/about";
import aboutData from "@/lib/data/about.json";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { hero } = aboutData;

export const metadata: Metadata = {
  title: "About Haelo Studios | Digital Design & Development Studio",
  description: hero.description,
  openGraph: {
    title: `${hero.title.line1} ${hero.title.line2} | Haelo Studios`,
    description: hero.description,
    url: `${siteUrl}/about`,
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
    title: `${hero.title.line1} ${hero.title.line2} | Haelo Studios`,
    description: hero.description,
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <AboutPage />;
}
