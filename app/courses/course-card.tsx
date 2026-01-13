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
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Course</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
        </div>
        <span className="text-xs text-zinc-500">
          {project.date ? new Date(project.date).getFullYear() : "WIP"}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-400">{project.description}</p>
      <ProjectTopics topics={project.topics} className="mt-4" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Progress</p>
          <p className="text-lg font-semibold text-white">
            {progress ? `${progress.score}% ${progress.grade}` : "Not started"}
          </p>
          <p className="text-xs text-zinc-500">
            {progress ? new Date(progress.updatedAt).toLocaleDateString() : "Ready to begin"}
          </p>
        </div>
        <Link
          href={`/projects/${project.slug}?from=courses`}
          className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-200 transition hover:border-white hover:text-white"
        >
          Take course
        </Link>
      </div>
    </article>
  );
}
