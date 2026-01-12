"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/.contentlayer/generated";
import { Card } from "@/app/components/card";
import { Article } from "@/app/projects/article";

type Props = {
	projects: Project[];
	views: Record<string, number>;
	topics: string[];
};

export function ProjectFilter({ projects, views, topics }: Props) {
	const [selectedTopic, setSelectedTopic] = useState("all");

	const filteredProjects = useMemo(() => {
		if (selectedTopic === "all") {
			return projects;
		}

		return projects.filter((project) => project.topics?.includes(selectedTopic));
	}, [projects, selectedTopic]);

	const columns = useMemo(
		() =>
			[0, 1, 2].map((column) =>
				filteredProjects.filter((_, index) => index % 3 === column),
			),
		[filteredProjects],
	);

	return (
		<section className="space-y-4">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div className="space-y-1">
					<p className="text-sm font-semibold text-zinc-200">Filter by tag</p>
					<select
						className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 focus:border-zinc-600 focus:outline-none"
						value={selectedTopic}
						onChange={(event) => setSelectedTopic(event.target.value)}
					>
						<option value="all">All topics</option>
						{topics.map((topic) => (
							<option key={topic} value={topic}>
								{topic}
							</option>
						))}
					</select>
				</div>
				<p className="text-xs text-zinc-500 md:text-right">
					Displaying {filteredProjects.length} project
					{filteredProjects.length === 1 ? "" : "s"}
				</p>
			</div>

			{filteredProjects.length === 0 ? (
				<p className="text-sm text-zinc-400">
					No projects match that topic yet. Try another tag.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{columns.map((columnProjects, columnIndex) => (
						<div key={columnIndex} className="grid grid-cols-1 gap-4">
							{columnProjects.map((project) => (
								<Card key={project.slug}>
									<Article project={project} views={views[project.slug] ?? 0} />
								</Card>
							))}
						</div>
					))}
				</div>
			)}
		</section>
	);
}
