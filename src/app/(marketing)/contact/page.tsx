import type { Metadata } from "next";
import ContactPage from "@/components/pages/contact";
import contentData from "@/lib/data/content.json";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { contact } = contentData;

export const metadata: Metadata = {
  title: "Contact Haelo Studios | Start Your Digital Project",
  description: contact.hero.description,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: `${contact.hero.title.line1} ${contact.hero.title.line2} | Haelo Studios`,
    description: contact.hero.description,
    url: `${siteUrl}/contact`,
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
    title: `${contact.hero.title.line1} ${contact.hero.title.line2} | Haelo Studios`,
    description: contact.hero.description,
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <ContactPage />;
}
