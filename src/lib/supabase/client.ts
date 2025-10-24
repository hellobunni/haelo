import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("🔧 Creating Supabase client:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlPreview: supabaseUrl ? `${supabaseUrl.slice(0, 30)}...` : "undefined",
  });

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl,
      keyLength: supabaseAnonKey?.length,
    });
    throw new Error("Missing Supabase environment variables");
  }

  console.log("✅ Supabase client created successfully");

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      storageKey: "sb-auth-token",
    },
  });
}
