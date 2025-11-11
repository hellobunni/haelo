import type { Metadata } from "next";
import contentData from "@/lib/data/content.json";
import { DARK_LOGO_URL } from "@/lib/utils";
import HomePage from "../../components/pages/home";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { home } = contentData;

export const metadata: Metadata = {
  title: "Haelo Studios | Premium Digital Design & Development",
  description: home.hero.description,
  openGraph: {
    title: `${home.hero.title.line1} ${home.hero.title.line2} | Haelo Studios`,
    description: home.hero.description,
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
    title: `${home.hero.title.line1} ${home.hero.title.line2} | Haelo Studios`,
    description: home.hero.description,
    images: [DARK_LOGO_URL],
  },
};

export default function Home() {
  return <HomePage />;
}
