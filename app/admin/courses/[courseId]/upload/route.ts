// app/admin/courses/[courseId]/upload/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/db/supabase-server";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return new NextResponse("Unauthorized", { status: 401 });

  const { filename, bucket = "lesson-media" } = await req.json();

  const supabase = await supabaseServer();
  const path = `${courseId}/${crypto.randomUUID()}-${filename}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ path, uploadUrl: data.signedUrl });
}
