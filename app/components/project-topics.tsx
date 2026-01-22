"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

function normalizeTopic(topic: string) {
	return topic.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

type Props = {
	topics?: string[];
	className?: string;
	clickable?: boolean;
};

export function ProjectTopics({ topics, className, clickable = true }: Props) {
	if (!topics?.length) {
		return null;
	}

	const containerClassName = ["flex flex-wrap gap-2", className].filter(Boolean).join(" ");
	const router = useRouter();

	return (
		<div className={containerClassName}>
			{topics.map((topic) => {
				const spanClassName = [
					"rounded-full border border-black bg-white px-3 py-1 text-xs font-semibold text-black backdrop-blur",
					clickable ? "cursor-pointer transition-all hover:bg-white/10 hover:border-white/20" : "",
				]
					.filter(Boolean)
					.join(" ");

				if (clickable) {
					const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
						event.stopPropagation();
						router.push(`/projects/topics/${encodeURIComponent(normalizeTopic(topic))}`);
					};

					return (
						<button
							key={normalizeTopic(topic)}
							type="button"
							className={spanClassName}
							onClick={handleClick}
						>
							{topic}
						</button>
					);
				}

				return (
					<span key={topic} className={spanClassName}>
						{topic}
					</span>
				);
			})}
		</div>
	);
}
