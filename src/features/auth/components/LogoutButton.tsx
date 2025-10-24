"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
