import type { Metadata } from "next";
import PrivacyPage from "@/components/pages/privacy";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Haelo Studios",
  description:
    "Learn how Haelo Studios collects, uses, and protects your personal information. Your privacy matters.",
  openGraph: {
    title: "Privacy Policy | Haelo Studios",
    description:
      "Learn how Haelo Studios collects, uses, and protects your personal information. Your privacy matters.",
    url: `${siteUrl}/privacy`,
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
    title: "Privacy Policy | Haelo Studios",
    description:
      "Learn how Haelo Studios collects, uses, and protects your personal information. Your privacy matters.",
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  return <PrivacyPage />;
}
