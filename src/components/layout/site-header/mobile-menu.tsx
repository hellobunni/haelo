"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { navigationItems } from "@/lib/utils";

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
        <div className="px-6 py-6 space-y-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              onClick={handleLinkClick}
              className={`block text-lg font-medium transition-colors duration-300 ${
                pathname === item.url ? "text-periwinkle-600" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" onClick={handleLinkClick} className="block">
            <Button
              size="sm"
              className="w-full bg-periwinkle-600 hover:bg-periwinkle-700 text-white rounded-xl"
            >
              Let's Talk
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
