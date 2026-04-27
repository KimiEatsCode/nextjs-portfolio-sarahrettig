"use client";

import { useMemo, useRef, useState } from "react";
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
	companies: string[];
};

export function ProjectFilter({ projects, topics, tools, companies }: Props) {
	const [selectedTopic, setSelectedTopic] = useState("all");
	const [selectedTool, setSelectedTool] = useState("all");
	const [selectedCompany, setSelectedCompany] = useState("all");
	const resultsRef = useRef<HTMLDivElement>(null);

	function scrollToResultsOnMobile() {
		if (typeof window === "undefined") return;
		if (!window.matchMedia("(max-width: 767px)").matches) return;

		requestAnimationFrame(() => {
			resultsRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}

	function handleCompanyChange(value: string) {
		setSelectedCompany(value);
		setSelectedTopic("all");
		scrollToResultsOnMobile();
	}

	function handleTopicChange(value: string) {
		setSelectedTopic(value);
		setSelectedCompany("all");
		scrollToResultsOnMobile();
	}

	const topicCounts = useMemo(() => {
		const counts = new Map<string, number>();

		for (const project of projects) {
			for (const topic of project.topics ?? []) {
				const key = normalize(topic);
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
		}

		return counts;
	}, [projects]);

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => {
			const matchesTopic =
				selectedTopic === "all" ||
				project.topics?.some((topic) => normalize(topic) === selectedTopic);

			const matchesTool =
				selectedTool === "all" ||
				project.tools?.some((tool) => normalize(tool) === selectedTool);

			const matchesCompany =
				selectedCompany === "all" ||
				project.companyName?.trim() === selectedCompany;

			return matchesTopic && matchesTool && matchesCompany;
		});
	}, [projects, selectedTopic, selectedTool, selectedCompany]);

	return (
		<section className="md:space-y-2 md:pt-2">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-10">
					<div className="space-y-1">
						<p className="text-sm font-semibold text-black">Filter by company</p>
						<select
							className="w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
							value={selectedCompany}
							onChange={(event) => handleCompanyChange(event.target.value)}
						>
							<option value="all">All companies</option>
							{companies.map((company) => (
								<option key={company} value={company}>
									{company}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-semibold text-black">Filter by tag</p>
						<select
							className="w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
							value={selectedTopic}
							onChange={(event) => handleTopicChange(event.target.value)}
						>
							<option value="all">All topics</option>
							{topics.map((topic) => (
								<option key={topic.value} value={topic.value}>
									{topic.label} ({topicCounts.get(normalize(topic.value)) ?? 0})
								</option>
							))}
						</select>
					</div>
				
				</div>
				<p className="text-md text-black md:text-right">
					Displaying {filteredProjects.length} project
					{filteredProjects.length === 1 ? "" : "s"}
				</p>
			</div>

			<div ref={resultsRef}>
				{filteredProjects.length === 0 ? (
					<p className="text-sm text-black">
						No projects match that filter. Try adjusting your selection.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
						{filteredProjects.map((project) => (
									<Card key={project.slug}>
										<Article project={project} />
									</Card>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
