import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/supabase/auth-helpers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Ensure user is authenticated (any role)
    await requireAuth();
  } catch (_error) {
    redirect("/login");
  }

  return <>{children}</>;
}
