import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getAllClientsWithData } from "@/features/admin/api";
import { generateSecurePassword } from "@/lib/helpers/generateSecurePassword";
import { requireAdmin } from "@/lib/supabase/auth-helpers";

export async function GET() {
  try {
    // Verify the user is an admin
    await requireAdmin();

    // Fetch all clients with data
    const clients = await getAllClientsWithData();

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error in /api/admin/clients:", error);

    if (error instanceof Error) {
      if (
        error.message === "Unauthorized" ||
        error.message.includes("Forbidden")
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify the user is an admin
    await requireAdmin();

    // Get the new client data from the request body
    const newClient = await request.json();
    console.log("📝 Creating new client:", newClient);

    // Validate required fields
    if (!newClient.email || !newClient.full_name) {
      return NextResponse.json(
        { error: "Email and full name are required" },
        { status: 400 },
      );
    }

    // Create Supabase client
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    // Check if user with this email already exists in users table
    const { data: existingProfile } = await supabase
      .from("users")
      .select("email")
      .eq("email", newClient.email)
      .single();

    if (existingProfile) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 },
      );
    }

    // Generate a secure temporary password
    const tempPassword = generateSecurePassword();
    console.log("🔑 Generated temporary password for:", newClient.email);

    // Create the auth user using Supabase Auth Admin API
    // Note: This requires SUPABASE_SERVICE_ROLE_KEY environment variable
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing required environment variables" },
        { status: 500 },
      );
    }

    const supabaseAdmin = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: newClient.email,
        password: tempPassword,
        email_confirm: true, // Auto-confirm email since admin is creating
        user_metadata: {
          full_name: newClient.full_name,
        },
      });

    if (authError || !authUser.user) {
      console.error("❌ Error creating auth user:", authError);
      return NextResponse.json(
        { error: authError?.message || "Failed to create auth user" },
        { status: 500 },
      );
    }

    console.log("✅ Auth user created:", authUser.user.id);

    // Insert or update the user profile into the users table
    const { data: createdProfile, error: profileError } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          id: authUser.user.id, // Use the same ID as auth user
          email: newClient.email,
          full_name: newClient.full_name,
          role: "client",
          company: newClient.company || null,
          phone: newClient.phone || null,
        },
        {
          onConflict: "id", // Handle conflicts on the id column
        },
      )
      .select()
      .single();

    if (profileError) {
      console.error("❌ Error creating user profile:", profileError);
      // Rollback: delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      throw profileError;
    }

    console.log(
      "✅ Client profile created successfully:",
      createdProfile.email,
    );

    // Optional: Send password reset email so user can set their own password
    const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: newClient.email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/client-portal`,
      },
    });

    if (resetError) {
      console.warn("⚠️ Could not generate magic link:", resetError);
    } else {
      console.log("📧 Magic link sent to:", newClient.email);
    }

    return NextResponse.json(
      {
        success: true,
        client: {
          id: createdProfile.id,
          email: createdProfile.email,
          full_name: createdProfile.full_name,
          role: createdProfile.role,
          company: createdProfile.company,
          phone: createdProfile.phone,
        },
        message: "Client created successfully. Login link sent to email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/admin/clients:", error);

    if (error instanceof Error) {
      if (
        error.message === "Unauthorized" ||
        error.message.includes("Forbidden")
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 },
    );
  }
}
