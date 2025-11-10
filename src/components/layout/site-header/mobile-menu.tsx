"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navigationItems } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-sm bg-white p-0 flex flex-col"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={handleLinkClick}
              className="text-xl font-bold"
            >
              Matte Digital
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 p-4 mt-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              onClick={handleLinkClick}
              className="block text-5xl font-bold py-3"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <SheetFooter className="p-4 border-t">
          <Link href="/contact" onClick={handleLinkClick} className="w-full">
            <Button className="w-full bg-periwinkle text-white font-bold text-lg h-16 rounded-2xl">
              Let's Talk
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
