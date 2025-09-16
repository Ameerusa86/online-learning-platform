import { createClient } from "@supabase/supabase-js";

// Test Supabase connection
export async function testSupabaseConnection() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test the connection by checking auth
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase connection error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("✅ Supabase connection successful!");
    console.log("URL:", supabaseUrl);
    console.log(
      "Session status:",
      data.session ? "Active session" : "No active session"
    );

    return { success: true, data };
  } catch (error) {
    console.error("❌ Supabase connection failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Test function for browser console
export function testInBrowser() {
  if (typeof window !== "undefined") {
    testSupabaseConnection().then((result) => {
      console.log("Supabase test result:", result);
    });
  }
}
