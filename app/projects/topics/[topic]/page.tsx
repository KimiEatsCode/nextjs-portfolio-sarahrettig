import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Article } from "@/app/projects/article";
import { notFound } from "next/navigation";

export const revalidate = 60;

function normalizeTopic(topic: string) {
  return topic.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

type Props = {
  params: Promise<{
    topic: string;
  }>;
};

export async function generateStaticParams(): Promise<{ topic: string }[]> {
  const topics = Array.from(
    new Map(
      allProjects
        .filter((p) => p.published)
        .flatMap((project) => project.topics ?? [])
        .map((topic) => topic.trim())
        .filter(Boolean)
        .map((topic) => [normalizeTopic(topic), topic] as const),
    ).entries(),
  ).map(([value]) => value);

  return topics.map((topic) => ({
    topic: encodeURIComponent(topic),
  }));
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const decodedTopic = decodeURIComponent(topic);
  const normalizedTopic = normalizeTopic(decodedTopic);

  const displayTopic =
    Array.from(
      new Map(
        allProjects
          .filter((p) => p.published)
          .flatMap((project) => project.topics ?? [])
          .map((t) => t.trim())
          .filter(Boolean)
          .map((t) => [normalizeTopic(t), t] as const),
      ).entries(),
    ).find(([value]) => value === normalizedTopic)?.[1] ?? decodedTopic;

  // Filter projects by topic
  const filteredProjects = allProjects
    .filter((p) => p.published)
    .filter((project) =>
      project.topics?.some((t) => normalizeTopic(t) === normalizedTopic),
    )
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
      <div className="px-6 pt-10 mx-auto space-y-8 lg:px-8 md:space-y-20 md:pt-20 lg:pt-12">
        <div className="mx-auto lg:mx-0">
      
          <div className="text-3xl mt-4 font-bold tracking-tight text-black">
            Projects tagged with "{displayTopic}"   
        
          </div>
          <p className="mt-4 text-black">
            Found {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} with this tag.
          </p>
        </div>
        <div className="w-full bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-start custom-grid-layout">
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
