"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCurrentMockUser } from "@/lib/api/mock/users";

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
