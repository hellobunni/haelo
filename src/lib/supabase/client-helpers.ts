import { createClient } from "@/lib/supabase/client";
import type { User } from "@/types";

/**
 * Wraps a promise with a timeout to prevent indefinite hanging
 */
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 5000,
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Operation timed out after ${timeoutMs}ms`)),
        timeoutMs,
      ),
    ),
  ]);
}

/**
 * Get the currently logged in user with profile data (client-side)
 * Returns null if not authenticated
 * Use this in client components ("use client")
 *
 * NOTE: Uses getUser() instead of getSession() because:
 * - getSession() reads from localStorage synchronously and can hang in some browsers
 * - getUser() makes an API call to verify the JWT, which is more reliable
 * - Includes timeout protection to prevent indefinite hanging
 */
export async function getCurrentUserClient(): Promise<User | null> {
  try {
    const supabase = createClient();

    console.log("getCurrentUserClient: Getting user...");

    let authUser = null;

    try {
      // Try getUser() first with a shorter timeout
      const {
        data: { user },
        error: authError,
      } = await withTimeout(
        supabase.auth.getUser(),
        3000, // 3 second timeout
      );

      if (authError) {
        console.error("Auth error from getUser():", authError);
      } else {
        authUser = user;
      }
    } catch (timeoutError) {
      console.warn(
        "getUser() timed out, falling back to getSession():",
        timeoutError,
      );

      // Fallback: try getSession() which reads from localStorage
      try {
        const {
          data: { session },
          error: sessionError,
        } = await withTimeout(
          supabase.auth.getSession(),
          2000, // 2 second timeout for localStorage read
        );

        if (!sessionError && session?.user) {
          authUser = session.user;
          console.log("Got user from session fallback");
        }
      } catch (_sessionTimeoutError) {
        console.error("Both getUser() and getSession() timed out");
        return null;
      }
    }

    console.log("getCurrentUserClient: User result:", { user: !!authUser });

    if (!authUser) {
      console.log("getCurrentUserClient: No user found");
      return null;
    }

    console.log(
      "getCurrentUserClient: Auth user found:",
      authUser.id,
      authUser.email,
    );

    console.log("getCurrentUserClient: Fetching profile from database...");
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    console.log("getCurrentUserClient: Profile result:", {
      profile: !!profile,
      error: profileError,
    });

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return null;
    }

    if (!profile) {
      console.error("No profile found for user");
      return null;
    }

    console.log(
      "getCurrentUserClient: Returning user:",
      profile.email,
      profile.role,
    );
    return {
      id: profile.id,
      email: profile.email,
      password: "", // Never expose password
      full_name: profile.full_name,
      role: profile.role,
      company: profile.company,
      phone: profile.phone,
      createdAt: profile.created_at,
    };
  } catch (error) {
    console.error("Unexpected error in getCurrentUserClient:", error);
    return null;
  }
}

/**
 * Synchronous alternative that gets user from session data in auth state callback
 * Useful when you already have the session from onAuthStateChange
 */
export async function getUserFromSession(userId: string): Promise<User | null> {
  try {
    console.log("getUserFromSession: Fetching profile for user:", userId);
    const supabase = createClient();

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    console.log("getUserFromSession: Profile result:", {
      profile: !!profile,
      error: profileError,
    });

    if (profileError || !profile) {
      console.error("getUserFromSession: Profile fetch error:", profileError);
      return null;
    }

    console.log(
      "getUserFromSession: Returning user:",
      profile.email,
      profile.role,
    );
    return {
      id: profile.id,
      email: profile.email,
      password: "",
      full_name: profile.full_name,
      role: profile.role,
      company: profile.company,
      phone: profile.phone,
      createdAt: profile.created_at,
    };
  } catch (error) {
    console.error("getUserFromSession: Unexpected error:", error);
    return null;
  }
}
