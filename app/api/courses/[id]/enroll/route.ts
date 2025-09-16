// app/api/courses/[id]/enroll/route.ts
import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/db/supabase-server";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return new NextResponse("Unauthorized", { status: 401 });

  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("enrollments")
    .insert({ user_id: session.user.id, course_id: id });

  if (error && !error.message.includes("duplicate key"))
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
