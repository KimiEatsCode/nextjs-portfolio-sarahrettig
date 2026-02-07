"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/.contentlayer/generated";
import { Card } from "@/app/components/card";
import { Article } from "@/app/projects/article";

function normalize(value: string) {
	return value.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

type Props = {
	projects: Project[];
	topics: { label: string; value: string }[];
	tools: { label: string; value: string }[];
};

export function ProjectFilter({ projects, topics, tools }: Props) {
	const [selectedTopic, setSelectedTopic] = useState("all");
	const [selectedTool, setSelectedTool] = useState("all");

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const matchesTopic =
				selectedTopic === "all" ||
				project.topics?.some((topic) => normalize(topic) === selectedTopic);

			const matchesTool =
				selectedTool === "all" ||
				project.tools?.some((tool) => normalize(tool) === selectedTool);

			return matchesTopic && matchesTool;
		});
	}, [projects, selectedTopic, selectedTool]);

	return (
		<section className="space-y-4">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
					<div className="space-y-1">
						<p className="text-sm font-semibold text-black">Filter by tag</p>
						<select
							className="w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
							value={selectedTopic}
							onChange={(event) => setSelectedTopic(event.target.value)}
						>
							<option value="all">All topics</option>
							{topics.map((topic) => (
								<option key={topic.value} value={topic.value}>
									{topic.label}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-semibold text-black">Filter by tool</p>
						<select
							className="w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
							value={selectedTool}
							onChange={(event) => setSelectedTool(event.target.value)}
						>
							<option value="all">All tools & technologies</option>
							{tools.map((tool) => (
								<option key={tool.value} value={tool.value}>
									{tool.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<p className="text-sm text-black md:text-right">
					Displaying {filteredProjects.length} project
					{filteredProjects.length === 1 ? "" : "s"}
				</p>
			</div>

			{filteredProjects.length === 0 ? (
				<p className="text-sm text-black">
					No projects match those filters. Try adjusting your selections.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-start">
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
