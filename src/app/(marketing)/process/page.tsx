import type { Metadata } from "next";
import ProcessPage from "@/components/pages/process";
import servicesData from "@/lib/data/services.json";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { process: processData } = servicesData;

export const metadata: Metadata = {
  title:
    "The Process | Four-Phase Digital Design & Development Approach | Haelo Studios",
  description: processData.header.description,
  openGraph: {
    title: `${processData.header.title} | Haelo Studios`,
    description: processData.header.description,
    url: `${siteUrl}/process`,
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
    title: `${processData.header.title} | Haelo Studios`,
    description: processData.header.description,
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <ProcessPage />;
}
