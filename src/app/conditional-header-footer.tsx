"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/layout/site-footer/site-footer";
import SiteHeader from "@/components/layout/site-header/site-header";

export default function ConditionalHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortfolioPage = pathname === "/portfolio";

  return (
    <>
      {/* Client header with its own state */}
      {!isPortfolioPage && <SiteHeader />}
      {/* Page content (route transitions handled in app/template.tsx) */}
      <main className={isPortfolioPage ? "" : "pt-20"}>{children}</main>
      {!isPortfolioPage && <SiteFooter />}
    </>
  );
}


