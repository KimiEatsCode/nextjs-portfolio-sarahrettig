"use client";

import Link from "next/link";
import { ProjectTopics } from "@/app/components/project-topics";
import type { CourseProgress } from "@/lib/learning";
import type { Project } from "@/.contentlayer/generated";

type Props = {
  project: Project;
  progress?: CourseProgress | null;
};

export function CourseCard({ project, progress }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black bg-white p-6 shadow-lg shadow-black/30">
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
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black">Progress</p>
          <p className="text-lg font-semibold text-black">
            {/* {progress ? `${progress.score}% ${progress.grade}` : "Not started"} */}
            {progress ? `${progress.favorite}` : "Not started"}
          </p>
          <p className="text-xs text-black">
            {progress ? new Date(progress.updatedAt).toLocaleDateString() : "Ready to begin"}
          </p>
        </div>
        <Link
          href={`/projects/${project.slug}?from=courses`}
          className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:border-black hover:text-black"
        >
          View Project
        </Link>
      </div>
    </article>
  );
}
