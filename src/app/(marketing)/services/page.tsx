import type { Metadata } from "next";
import ServicesPage from "@/components/pages/services";
import servicesData from "@/lib/data/services.json";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { hero } = servicesData;

export const metadata: Metadata = {
  title:
    "Services | Web Design, Development & Digital Strategy | Haelo Studios",
  description: hero.description,
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: `${hero.title.line1} | Haelo Studios`,
    description: hero.description,
    url: `${siteUrl}/services`,
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
    title: `${hero.title.line1} | Haelo Studios`,
    description: hero.description,
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <ServicesPage />;
}
