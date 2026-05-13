import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user?.email) {
      // Upsert subscriber on first login
      await supabase.from("subscribers").upsert(
        {
          email: data.user.email,
          user_id: data.user.id,
        },
        { onConflict: "email", ignoreDuplicates: true }
      );

      // Upsert user profile
      await supabase.from("user_profiles").upsert(
        {
          user_id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || "",
          avatar_url: data.user.user_metadata?.avatar_url || "",
        },
        { onConflict: "user_id", ignoreDuplicates: true }
      );
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
