// app/api/lessons/[id]/progress/route.ts
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
  // upsert completed=true
  const { error } = await supabase.from("progress").upsert(
    {
      user_id: session.user.id,
      lesson_id: id,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
