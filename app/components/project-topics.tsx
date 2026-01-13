 "use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

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
					"rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-100 backdrop-blur",
					clickable ? "cursor-pointer transition-all hover:bg-white/10 hover:border-white/20" : "",
				]
					.filter(Boolean)
					.join(" ");

				if (clickable) {
				const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
						event.stopPropagation();
						router.push(`/projects/topics/${encodeURIComponent(topic)}`);
					};

					return (
						<button
							key={topic}
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
