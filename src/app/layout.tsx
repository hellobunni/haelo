import type { Metadata } from "next";
import "@/styles/globals.css";
import SiteHeader from "@/components/layout/site-header/site-header";
import FooterAuth from "../footer-auth";

export const metadata: Metadata = {
  title: "Matte Digital",
  description: "Creative Digital Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1d1d1f] font-sans antialiased">
        <StyleTokens />
        {/* Client header with its own state */}
        <SiteHeader />
        {/* Page content (route transitions handled in app/template.tsx) */}
        <main className="pt-24">{children}</main>
        <footer className="bg-white mt-20 py-8">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 text-sm text-gray-500 flex flex-wrap justify-between items-center gap-4">
            <p>© Matte Digital {new Date().getFullYear()}</p>
            <FooterAuth />
            <p>Creative Digital Studio</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

function StyleTokens() {
  return (
    <style>{`
      :root {
        --background: #FFFFFF;
        --foreground: #1d1d1f;
        --periwinkle: #9381ff;
        --border: #e5e5e5;
      }
      .text-periwinkle { color: var(--periwinkle); }
      .bg-periwinkle { background-color: var(--periwinkle); }
      .section-heading { font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 700; letter-spacing: -0.05em; line-height: 1; }
      .sub-heading { font-size: clamp(2rem, 6vw, 4rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
      .list-item-heading { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; }
      .layered-heading { font-size: clamp(3rem, 10vw, 7rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; position: relative; color: #111; }
      .layered-heading span { position: absolute; top: 0; left: 0; color: var(--periwinkle); transform: translate(3px, 3px); z-index: -1; -webkit-text-stroke: 0; }
    `}</style>
  );
}
