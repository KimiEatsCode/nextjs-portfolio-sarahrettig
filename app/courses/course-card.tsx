"use client";

import Link from "next/link";
import { ProjectTopics } from "@/app/components/project-topics";
import type { Project } from "@/.contentlayer/generated";

type Props = {
  project: Project;
  progress?: null;
};

export function CourseCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="overflow-hidden rounded-2xl bg-gray-200 p-6 hover:bg-gray-300 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black">Project</p>
            <h3 className="mt-2 text-2xl font-semibold text-black">{project.title}</h3>
          </div>
          <span className="text-xs text-black">
            {project.date ? new Date(project.date).getFullYear() : "WIP"}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-black">{project.description}</p>
        <ProjectTopics topics={project.topics} className="mt-4" />
        <div className="mt-6">
          <span className="text-sm font-semibold text-black">View Project →</span>
        </div>
      </article>
    </Link>
  );
}
