import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { getCurrentUser } from "@/lib/supabase/auth-helpers";

const FooterAuth = async () => {
  const currentUser = await getCurrentUser();

  // For debugging: log in this component
  console.log(
    "FooterAuth - User status:",
    currentUser ? `Logged in as ${currentUser.email}` : "Not logged in",
  );

  if (!currentUser) {
    // Show login link when not authenticated
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" className="rounded-full text-sm">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  // Show user-specific navigation when authenticated
  return (
    <div className="flex items-center gap-2">
      <Link href={currentUser.role === "admin" ? "/admin" : "/client-portal"}>
        <Button variant="ghost" className="rounded-full text-sm">
          {currentUser.role === "admin" ? "Admin Dashboard" : "Client Portal"} (
          {currentUser.full_name})
        </Button>
      </Link>
      <LogoutButton />
    </div>
  );
};

export default FooterAuth;
