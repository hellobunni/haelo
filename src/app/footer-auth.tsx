"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentMockUser, type MockUser } from "@/lib/mock-data/users";

export default function FooterAuth() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after component mounts (client-side only)
    setMounted(true);

    // Check if user is logged in
    const currentUser = getCurrentMockUser();
    setUser(currentUser);
  }, []);

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
    <Link href="/client-portal">
      <Button variant="ghost" className="rounded-full text-sm">
        Client Portal ({user.full_name})
      </Button>
    </Link>
  );
}
