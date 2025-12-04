import type { Metadata } from "next";
import AboutPage from "@/components/pages/about";
import aboutData from "@/lib/data/about.json";
import { generatePersonSchema, renderJsonLdScript } from "@/lib/seo/schema";
import { DARK_LOGO_URL } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";
const { hero, founder } = aboutData;

export const metadata: Metadata = {
  title: "About Haelo Studios | Digital Design & Web Development",
  description:
    "A boutique digital design and web development studio blending aesthetic sophistication with engineering excellence. Crafting exceptional digital experiences for premium brands.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: `${hero.title.line1} ${hero.title.line2} | Haelo Studios`,
    description:
      "A boutique digital design and web development studio blending aesthetic sophistication with engineering excellence. Crafting exceptional digital experiences for premium brands.",
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
    description:
      "A boutique digital design and web development studio blending aesthetic sophistication with engineering excellence. Crafting exceptional digital experiences for premium brands.",
    images: [DARK_LOGO_URL],
  },
};

export default function Page() {
  // Generate Person Schema for founder
  const personSchema = generatePersonSchema({
    name: founder.name,
    jobTitle: founder.title,
    url: `${siteUrl}/about`,
    image: founder.image.src,
    socialProfiles: [
      founder.social.linkedin.href,
      "https://instagram.com/haelostudios",
    ],
    email: founder.social.email.href.replace("mailto:", ""),
    worksFor: {
      name: "Haelo Studios",
      url: siteUrl,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema is safe, content is controlled
        dangerouslySetInnerHTML={{
          __html: renderJsonLdScript(personSchema),
        }}
      />
      <AboutPage />
    </>
  );
}
