"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentMockUser, mockLogout } from "@/lib/api/mock/users";
import type { MockUser } from "@/types";

export default function FooterAuth() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after component mounts (client-side only)
    setMounted(true);

    // Check if user is logged in
    const currentUser = getCurrentMockUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    mockLogout();
    setUser(null);
    router.push("/");
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="ghost" className="rounded-full text-sm">
          Client Login
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/client-portal">
        <Button variant="ghost" className="rounded-full text-sm">
          Client Portal ({user.full_name})
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="rounded-full text-sm"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
