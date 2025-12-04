import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haelostudios.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/client-portal", "/invoices", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
