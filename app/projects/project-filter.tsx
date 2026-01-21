"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/.contentlayer/generated";
import { Card } from "@/app/components/card";
import { Article } from "@/app/projects/article";

type Props = {
	projects: Project[];
	topics: string[];
};

export function ProjectFilter({ projects, topics }: Props) {
	const [selectedTopic, setSelectedTopic] = useState("all");

	const filteredProjects = useMemo(() => {
		if (selectedTopic === "all") {
			return projects;
		}

		return projects.filter((project) =>
			project.topics?.some((topic) => topic.trim() === selectedTopic),
		);
	}, [projects, selectedTopic]);

	return (
		<section className="space-y-4">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div className="space-y-1">
					<p className="text-sm font-semibold text-black">Filter by tag</p>
					<select
						className="w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
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
				<p className="text-sm text-black md:text-right">
					Displaying {filteredProjects.length} project
					{filteredProjects.length === 1 ? "" : "s"}
				</p>
			</div>

			{filteredProjects.length === 0 ? (
				<p className="text-sm text-black">
					No projects match that topic yet. Try another tag.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{filteredProjects.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
					))}
				</div>
			)}
		</section>
	);
}
