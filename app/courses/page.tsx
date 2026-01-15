import Link from "next/link";
import { Navigation } from "@/app/components/nav";
import { CourseCard } from "./course-card";
import { allProjects } from "contentlayer/generated";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCourseProgress, type CourseProgress } from "@/lib/learning";
import { SignInPrompt } from "@/app/components/sign-in-prompt";

export const metadata = {
  title: "Favorites",
  description: "Track Your Favorites",
};

export const revalidate = 0; // Disable caching for this page

export default async function CoursesPage() {
  
  const session = await getServerSession(authOptions);
  const projects = allProjects.filter((project) => project.published);

  const progressMap: Record<string, CourseProgress | null> = {};
  let favoritedProjects = projects;
  
  if (session?.user?.id) {
    const entries = await Promise.all(
      projects.map(async (project) => [
        project.slug,
        await getCourseProgress(session.user.id, project.slug),
      ] as const),
    );
    for (const [slug, progress] of entries) {
      progressMap[slug as string] = progress;
    }
    
    // Filter to only show projects that have been favorited
    favoritedProjects = projects.filter((project) => {
      const progress = progressMap[project.slug];
      return progress?.favorite === true;
    });
  }

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-black">SCORM workspace</p>
          <h1 className="text-4xl font-bold text-black sm:text-5xl">
            {/* Hi, welcome {session?.user?.name ?? "guest"}! Continue learning with tracked courses below. */}
             Hi, welcome {session?.user?.name ?? "guest"}! View your Favorite Projects below.
          </h1>
          <p className="text-black">
            {/* All projects double as courses. Sign in to launch the SCORM engine and save grades through Upstash. */}
          </p>
        </div>
        {!session ? (
          <div className="rounded-2xl border border-dashed border-black bg-white px-8 py-10 text-center text-sm text-black">
            <SignInPrompt />
            <p className="mt-2">
              {/* We store your SCORM score in Upstash each time you launch a project. 
              Once authenticated, every view auto-grades you with 100% completion. */}
            </p>
            <p className="mt-3 text-xs text-black">
              Already have a favorites account tied to another provider?{" "}
              <Link
                className="font-semibold underline"
                href="/link-account"
              >
                Link that provider to this profile
              </Link>{" "}
              so you can use either sign-in method.
            </p>
          </div>
        ) : (
          <>
            {favoritedProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black bg-white px-8 py-10 text-center text-sm text-black">
                <p className="text-lg font-semibold">No favorites yet</p>
                <p className="mt-2">
                  Visit the{" "}
                  <Link
                    className="font-semibold underline"
                    href="/projects"
                  >
                    projects page
                  </Link>{" "}
                  to add projects to your favorites.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {favoritedProjects.map((project) => (
                  <CourseCard
                    key={project.slug}
                    project={project}
                    progress={progressMap[project.slug]}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
