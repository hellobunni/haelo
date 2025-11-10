import type { Metadata } from "next";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import contentData from "@/lib/data/content.json";
import { navigationItems } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Haelo Studio",
  description:
    "We craft elevated digital experiences for premium brands. Refined design. Smart engineering. Lasting impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Analytics />
          <Toaster />
          <StyleTokens />
          {/* Client header with its own state */}
          <SiteHeader />
          {/* Page content (route transitions handled in app/template.tsx) */}
          <main className="pt-24">{children}</main>
          <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-periwinkle-900 rounded-full blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-periwinkle-800 rounded-full blur-3xl opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                {/* Brand Column */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-periwinkle-600 to-periwinkle-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <span className="text-xl font-bold">Haelo Studios</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    {contentData.footer.brand.description}
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-3">
                    {navigationItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.url}
                          className="text-gray-400 hover:text-periwinkle-400 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold mb-4">Get in Touch</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li>
                      <a
                        href={`mailto:${contentData.footer.contact.email}`}
                        className="hover:text-periwinkle-400 transition-colors duration-300"
                      >
                        {contentData.footer.contact.email}
                      </a>
                    </li>
                    <li>{contentData.footer.contact.availability}</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Haelo Studios. All rights
                  reserved.
                </p>
                <div className="flex gap-6 text-sm text-gray-500">
                  <a
                    href={contentData.footer.links.privacy}
                    className="hover:text-periwinkle-400 transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href={contentData.footer.links.terms}
                    className="hover:text-periwinkle-400 transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

function StyleTokens() {
  return (
    <style>{`
      :root {
        --periwinkle: #9381ff;
      }
      .text-periwinkle { color: var(--periwinkle); }
      .bg-periwinkle { background-color: var(--periwinkle); }
      .section-heading { font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 700; letter-spacing: -0.05em; line-height: 1; }
      .sub-heading { font-size: clamp(2rem, 6vw, 4rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
      .list-item-heading { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; }
      .layered-heading { font-size: clamp(3rem, 10vw, 7rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; position: relative; color: var(--foreground); }
      .layered-heading span { position: absolute; top: 0; left: 0; color: var(--periwinkle); transform: translate(3px, 3px); z-index: -1; -webkit-text-stroke: 0; }
    `}</style>
  );
}
