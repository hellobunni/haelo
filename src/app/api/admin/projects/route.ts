import { NextResponse } from "next/server";
import { getAllProjectsFromSupabase } from "@/features/admin/supabase-api";
import { requireAdmin } from "@/lib/supabase/auth-helpers";

export async function GET() {
  try {
    // Ensure user is admin
    await requireAdmin();

    const projects = await getAllProjectsFromSupabase();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
