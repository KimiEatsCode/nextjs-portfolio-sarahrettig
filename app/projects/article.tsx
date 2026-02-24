import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { ProjectTopics } from "@/app/components/project-topics";

type Props = {
	project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {
	const firstImage = project.heroImages?.[0];
	const imageSrc = firstImage?.src || "/images/placeholder-image.png";

	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-6">
				<div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
					<Image
						src={imageSrc}
						alt={firstImage?.alt || project.title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
					/>
				</div>
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-black group-hover:text-black group-hover:border-black drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>COMING SOON</span>
						)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-black group-hover:text-black font-display">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-black group-hover:text-black">
					{project.description}
				</p>
				<ProjectTopics topics={project.topics} className="mt-4" />
			</article>
		</Link>
	);
};
