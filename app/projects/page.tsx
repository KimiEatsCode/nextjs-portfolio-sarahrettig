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
import { FeaturedProjectSlider } from "../components/featured-project-slider";

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
  
  const featuredSliderProjects = featuredByTopic
    .filter((p) => p.heroImages && p.heroImages.length > 0)
    .map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      heroImageSrc: p.heroImages![0].src,
      heroImageAlt: p.heroImages![0].alt ?? p.title,
      topics: p.topics ?? [],
      tools: p.tools ?? [],
    }));

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

  const companies = Array.from(
    new Set(
      allProjects
        .filter((p) => p.published)
        .map((p) => p.companyName?.trim())
        .filter(Boolean) as string[],
    ),
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return (
    <div className="relative pb-10">
      <Navigation />
      <div className="px-6 mx-auto space-y-8 lg:px-10 sm:mt-5 md:pt-5 lg:pt-5">
        {featuredSliderProjects.length > 0 && (
          <FeaturedProjectSlider projects={featuredSliderProjects} />
        )}
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-center text-black sm:text-4xl space-y-2 sm:mt-2 md:pt-8 lg:pt-82">
            Projects
          </h2>
        </div>
        <ProjectFilter projects={sorted} topics={topics} tools={tools} companies={companies} />
      </div>
      <Footer />
    </div>
  );
}
