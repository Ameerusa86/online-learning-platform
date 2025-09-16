// app/api/lessons/[id]/media/route.ts
import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/db/supabase-server";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return new NextResponse("Unauthorized", { status: 401 });

  const supabase = await supabaseServer();
  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, section_id, video_url, sections!inner(course_id)")
    .eq("id", id)
    .single();
  if (!lesson?.video_url) return new NextResponse("Not found", { status: 404 });

  // Normalize sections result which can be either an array (due to join) or a single object
  const sections = lesson?.sections as
    | { course_id: string }[]
    | { course_id: string }
    | undefined;
  const courseId = Array.isArray(sections)
    ? sections[0]?.course_id
    : sections?.course_id;

  if (!courseId) return new NextResponse("Not found", { status: 404 });

  const { data: enrolled } = await supabase
    .from("enrollments")
    .select("user_id")
    .eq("user_id", session.user.id)
    .eq("course_id", courseId)
    .maybeSingle();

  const { data: courseRow } = await supabase
    .from("courses")
    .select("owner_id, is_published")
    .eq("id", courseId)
    .single();
  const isAuthor = courseRow?.owner_id === session.user.id;

  if (!isAuthor && !enrolled)
    return new NextResponse("Forbidden", { status: 403 });

  const { data: signed, error } = await supabase.storage
    .from("lesson-media")
    .createSignedUrl(lesson.video_url, 60);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ url: signed.signedUrl });
}
