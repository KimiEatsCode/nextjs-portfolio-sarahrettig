type Props = {
	topics?: string[];
	className?: string;
};

export function ProjectTopics({ topics, className }: Props) {
	if (!topics?.length) {
		return null;
	}

	const containerClassName = ["flex flex-wrap gap-2", className].filter(Boolean).join(" ");

	return (
		<div className={containerClassName}>
			{topics.map((topic) => (
				<span
					key={topic}
					className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-100 backdrop-blur"
				>
					{topic}
				</span>
			))}
		</div>
	);
}
