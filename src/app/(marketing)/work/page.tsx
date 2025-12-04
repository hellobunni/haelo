import type { Metadata } from "next";
import WorkPage from "@/components/pages/work";
import contentData from "@/lib/data/content.json";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { work } = contentData;

export const metadata: Metadata = {
  title: "Work | Digital Design & Web Development Portfolio | Haelo Studios",
  description:
    "Explore our portfolio of digital design and web development projects. Each project reflects a signature blend of elegance and engineering—crafted digital experiences for clients who demand excellence.",
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: `${work.hero.title.line1} ${work.hero.title.line2} | Haelo Studios`,
    description:
      "Explore our portfolio of digital design and web development projects. Each project reflects a signature blend of elegance and engineering—crafted digital experiences for clients who demand excellence.",
    url: `${siteUrl}/work`,
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
    title: `${work.hero.title.line1} ${work.hero.title.line2} | Haelo Studios`,
    description:
      "Explore our portfolio of digital design and web development projects. Each project reflects a signature blend of elegance and engineering—crafted digital experiences for clients who demand excellence.",
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <WorkPage />;
}
