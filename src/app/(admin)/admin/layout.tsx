"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentMockUser } from "@/lib/mock-data/users";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentMockUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (currentUser.role !== "admin") {
      router.push("/");
      return;
    }
  }, [router]);

  return <>{children}</>;
}
