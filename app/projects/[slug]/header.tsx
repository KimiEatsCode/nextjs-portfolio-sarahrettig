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

type Props = {
	project: {
		url?: ProjectLink[];
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
					<div className="mx-auto lg:mx-0">
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
						<h1 className="text-4xl mt-4 font-bold tracking-tight text-black sm:text-6xl font-display">
							{project.title}
						</h1>
						
						<p className="mt-6 text-lg text-center leading-8 text-black">
							{project.description}
						</p>
						<ProjectTopics topics={project.topics} className="mt-6 justify-center gap-3" />
					</div>
					
					<div className="mx-auto mt-10 mb-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<div><h3>Project Links: <Link target="_blank" key={`${link.label}-${link.href}`} href={link.href} aria-label={link.alt || link.label}>
									{link.label} <span aria-hidden="true">{link.href}</span>
								</Link></h3>
							    </div>
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
