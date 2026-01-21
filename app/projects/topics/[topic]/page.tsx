import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Article } from "@/app/projects/article";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
  params: Promise<{
    topic: string;
  }>;
};

export async function generateStaticParams(): Promise<{ topic: string }[]> {
  const topics = Array.from(
    new Set(
      allProjects
        .filter((p) => p.published)
        .flatMap((project) => project.topics ?? [])
        .map((topic) => topic.trim()),
    ),
  ).filter(Boolean);

  return topics.map((topic) => ({
    topic: encodeURIComponent(topic),
  }));
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const decodedTopic = decodeURIComponent(topic);

  // Filter projects by topic
  const filteredProjects = allProjects
    .filter((p) => p.published)
    .filter((project) => project.topics?.includes(decodedTopic))
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  if (filteredProjects.length === 0) {
    notFound();
  }

  // Split projects into 3 columns
  const columns = [0, 1, 2].map((column) =>
    filteredProjects.filter((_, index) => index % 3 === column),
  );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Link
            href="/projects"
            className="text-sm text-black hover:text-black transition-colors duration-200"
          >
            &larr; Back to all projects
          </Link>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Projects tagged with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400">
              "{decodedTopic}"
            </span>
          </h2>
          <p className="mt-4 text-black">
            Found {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} with this tag.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((columnProjects, columnIndex) => (
            <div key={columnIndex} className="grid grid-cols-1 gap-4">
              {columnProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} />
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
