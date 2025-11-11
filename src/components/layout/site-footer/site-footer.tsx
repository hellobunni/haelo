import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import contentData from "@/lib/data/content.json";
import { DARK_LOGO_URL, navigationItems } from "@/lib/utils";

export default function SiteFooter() {
  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-periwinkle-900 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-periwinkle-800 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image
                src={DARK_LOGO_URL}
                alt="Haelo Studios Logo"
                width={250}
                height={32}
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
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
        <Separator className="mt-8 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Haelo Studios. All rights reserved.
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
  );
}

