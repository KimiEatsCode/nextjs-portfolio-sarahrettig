import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ProjectTopics } from "@/app/components/project-topics";
import { Article } from "./article";
import { ProjectFilter } from "./project-filter";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    )[0];
  
  const sorted = allProjects
    .filter((p) => p.published)
    .filter((project) => project.slug !== featured?.slug)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  const topics = Array.from(
    new Set(
      allProjects
        .flatMap((project) => project.topics ?? [])
        .map((topic) => topic.trim()),
    ),
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-black">
            
          </p>
        </div>

        {featured && (
          <div className="grid grid-cols-1 gap-8 mx-auto xlg:grid-cols-8 ">
            <Card>
              <Link href={`/projects/${featured.slug}`}>
                <article className="relative w-full h-full p-4 mb-4 md:p-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-black">
                      {featured.date ? (
                        <time dateTime={new Date(featured.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured.date))}
                        </time>
                      ) : (
                        <span>COMING SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-black">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-black group-hover:text-black sm:text-4xl font-display"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-black group-hover:text-black">
                    {featured.description}
                  </p>
                  <ProjectTopics topics={featured.topics} className="mt-6" />
                 
                </article>
              </Link>
            </Card>
{/* 
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div> */}
          </div>
        )}
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <ProjectFilter projects={sorted} views={views} topics={topics} />
      </div>
    </div>
  );
}
