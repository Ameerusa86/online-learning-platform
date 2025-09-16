// app/api/courses/route.ts
import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/db/supabase-server";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

// Local slugify implementation (previous util had no named export)

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const { title } = body;
  const slug = slugify(title);

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("courses")
    .insert({
      owner_id: session.user.id,
      title,
      slug,
      is_published: false,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function GET() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
