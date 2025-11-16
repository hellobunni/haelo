import { Analytics } from "@vercel/analytics/next";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      {children}
    </>
  );
}
