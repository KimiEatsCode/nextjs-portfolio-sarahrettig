import { authOptions } from "@/lib/auth";
import { setCourseProgress } from "@/lib/learning";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { slug?: string };

  if (!body.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const progress = await setCourseProgress(session.user.id, body.slug, {
    score: 100,
    status: "completed",
    favorite: true,
  });

  // Revalidate the courses page and the specific project page
  revalidatePath("/courses");
  revalidatePath(`/projects/${body.slug}`);

  return NextResponse.json({ progress });
}
