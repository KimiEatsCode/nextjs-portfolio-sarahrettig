"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ProjectTopics } from "@/app/components/project-topics";
import Image from "next/image";
import { ImageSlider } from "../../components/image-slider";

type HeroImage = {
	src: string;
	alt?: string;
	caption?: string;
};

type ProjectLink = {
	src: string;
	label?: string;
	alt?: string;
};

type ProjectLink2 = {
	src: string;
	label?: string;
	alt?: string;
};

type Props = {
	project: {
		url?: ProjectLink[];
		url2?: ProjectLink2[];
		title: string;
		description: string;
		repository?: string;
		topics?: string[];
		heroImages?: HeroImage[];
		jobTitle?: string;
		companyName?: string;
	};
};
export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string; alt?: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	project.url?.forEach((projectLink) => {
		if (!projectLink?.src) return;
		links.push({
			label: projectLink.label || "Website",
			href: projectLink.src,
			alt: projectLink.alt,
		});

	project.url2?.forEach((projectLink2) => {
if (!projectLink2?.src) return;
links.push({
	label: projectLink2.label || "Website",
	href: projectLink2.src,
	alt: projectLink2.alt,
});
});
	});
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 bg-white duration-200 border-b ${
					isIntersecting
						? "bg-white border-transparent"
						: "bg-white  border-zinc-200 lg:border-transparent"
				}`}
			>
			</div>
						
			<div className="container mx-auto relative isolate overflow-hidden sm:py-10">
				<div className="mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto lg:mx-0 mt-10">
						{(project.jobTitle || project.companyName) && (
							<div className="mt-4 text-base text-zinc-600">
								{project.jobTitle && <span className="font-semibold">{project.jobTitle}</span>}
								{project.jobTitle && project.companyName && <span className="mx-2">
									
								</span>}
								<p>
								{project.companyName && <span>{project.companyName}</span>}
								</p>
							</div>
						)}	
						<h1 className="text-5xl mt-4 font-bold tracking-tight text-black sm:text-6xl font-display">
							{project.title}
						</h1>
						
						<p className="mt-6 text-mdtext-center leading-8 text-black">
							{project.description}
						</p>
					
					</div>
					
					<div className="mx-auto mt-5 mb-5 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-4 gap-x-4 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-6">
							{links.map((link) => (
								<Link
									key={`${link.label}-${link.href}`}
									target="_blank"
									rel="noopener noreferrer"
									href={link.href}
									aria-label={link.alt || link.label}
									className="inline-flex items-center justify-center rounded-md border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
					{project.heroImages && project.heroImages.length > 0 && (
						<div className="mx-auto max-w-5xl w-full px-6">
							<ImageSlider
								images={project.heroImages.map((image, index) => ({
									src: image.src,
									alt: image.alt ?? `${project.title} - Image ${index + 1}`,
									caption: image.caption,
									href: image.src,
								}))}
							/>
						</div>
					)}

				</div>
			</div>
		</header>
	);
};
