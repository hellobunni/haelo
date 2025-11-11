"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { LOGO_URL, navigationItems } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-sm bg-white p-0 flex flex-col"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src={LOGO_URL}
              alt="Haelo Studios Logo"
              width={175}
              height={32}
            />
          </Link>
        </div>

        <div className="px-6 py-6 space-y-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              onClick={handleLinkClick}
              className={`block text-lg font-medium transition-colors duration-300 ${
                pathname === item.url ? "text-gray-600" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" onClick={handleLinkClick} className="block">
            <Button size="full" variant="periwinkle">
              Let's Talk
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
