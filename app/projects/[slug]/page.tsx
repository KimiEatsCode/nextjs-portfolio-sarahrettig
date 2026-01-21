import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCourseProgress, type CourseProgress } from "@/lib/learning";
import { CourseCompletionButton } from "../course-completion-button";
import { SignInPrompt } from "@/app/components/sign-in-prompt";
import { Card } from "@/app/components/card";
import Link from "next/link";
import { ProjectTopics } from "@/app/components/project-topics";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

  // Get related projects with same tags
  const relatedProjects = allProjects
    .filter((p) => 
      p.published && 
      p.slug !== slug && 
      p.topics?.some((topic) => project.topics?.includes(topic))
    )
    .slice(0, 3);

  const session = await getServerSession(authOptions);
  const isSignedIn = Boolean(session?.user?.id);
  let progress: CourseProgress | null = null;

  if (session?.user?.id) {
    progress = await getCourseProgress(session.user.id, slug);
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navigation />
      <Header project={project} />

      <article className="px-4 mx-auto text-center prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
      
      {relatedProjects.length > 0 && (
        <section className="px-6 py-12 mt-12 border-t border-zinc-200">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-black mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <Card key={relatedProject.slug}>
                  <Link href={`/projects/${relatedProject.slug}`}>
                    <article className="relative w-full h-full p-4 md:p-6">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="text-xs text-zinc-600">
                          {relatedProject.date ? (
                            <time dateTime={new Date(relatedProject.date).toISOString()}>
                              {Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                              }).format(new Date(relatedProject.date))}
                            </time>
                          ) : (
                            <span>COMING SOON</span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-black hover:text-zinc-700 transition-colors font-display line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-700 line-clamp-3">
                        {relatedProject.description}
                      </p>
                      <ProjectTopics topics={relatedProject.topics} className="mt-4" />
                    </article>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
        
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
