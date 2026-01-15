import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCourseProgress, type CourseProgress } from "@/lib/learning";
import { CourseCompletionButton } from "../course-completion-button";
import { SignInPrompt } from "@/app/components/sign-in-prompt";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  const session = await getServerSession(authOptions);
  const isSignedIn = Boolean(session?.user?.id);
  let progress: CourseProgress | null = null;

  if (session?.user?.id) {
    progress = await getCourseProgress(session.user.id, slug);
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navigation />
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
      {!isSignedIn && (
        <section className="flex flex-row justify-center px-6 py-12 mt-8 border-t border-zinc-900/40 bg-zinc-100/70">
          <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 text-center text-black md:flex-row md:text-left">
            <SignInPrompt />
          </div>
        </section>
      )}
      {isSignedIn && (
        <section className="px-6 py-12 mt-8 border-t border-zinc-900/40 bg-zinc-100/70">
          <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 text-center text-black md:flex-row md:text-left">
            <CourseCompletionButton slug={project.slug} initialProgress={progress} />
          </div>
        </section>
      )}
    </div>
  );
}
