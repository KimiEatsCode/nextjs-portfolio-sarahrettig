import Link from "next/link";
import Image from "next/image";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ProjectTopics } from "@/app/components/project-topics";
import { Article } from "./article";
import { ProjectFilter } from "./project-filter";
import { Footer } from "../components/footer";

export const revalidate = 60;
export default async function ProjectsPage() {
  const normalizeTopic = (topic: string) =>
    topic.trim().toLowerCase().replace(/[\s_-]+/g, "");

  const featuredTopicKeyword = "featured";
  const sanitizedFeaturedTopicKeyword = featuredTopicKeyword.trim().toLowerCase();

  const featuredByTopic = allProjects
    .filter((p) => p.published)
    .filter((project) =>
      project.topics?.some(
        (topic) => topic.trim().toLowerCase() === sanitizedFeaturedTopicKeyword,
      ),
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  const featured =
    featuredByTopic.length > 0
      ? featuredByTopic[0]
      : allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    )[0];
  
  const sorted = allProjects
    .filter((p) => p.published)
    .sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );

  const topics = Array.from(
    new Map(
      allProjects
        .flatMap((project) => project.topics ?? [])
        .map((topic) => topic.trim())
        .filter(Boolean)
        .map((topic) => [normalizeTopic(topic), topic] as const),
    ).entries(),
  )
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));

  const tools = Array.from(
    new Map(
      allProjects
        .flatMap((project) => project.tools ?? [])
        .map((tool) => tool.trim())
        .filter(Boolean)
        .map((tool) => [normalizeTopic(tool), tool] as const),
    ).entries(),
  )
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 mx-auto space-y-8 lg:px-8 sm:mt-10 md:pt-16 lg:pt-16">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-center text-black sm:text-4xl">
            Projects
          </h2>
    
        </div>
        <ProjectFilter projects={sorted} topics={topics} tools={tools} />
      </div>
      
    </div>
  );
}
