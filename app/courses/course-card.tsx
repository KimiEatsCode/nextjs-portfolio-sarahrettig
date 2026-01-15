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
            {progress ? (
              progress.favorite ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-red-600"
                    aria-hidden="true"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Favorited
                </span>
              ) : (
                "Not favorited"
              )
            ) : (
              "Not started"
            )}
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
