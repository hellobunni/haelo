import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth-helpers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // This will throw if user is not authenticated or not an admin
    await requireAdmin();
  } catch (error) {
    // Redirect to login if not authorized
    redirect("/login");
  }

  return <>{children}</>;
}