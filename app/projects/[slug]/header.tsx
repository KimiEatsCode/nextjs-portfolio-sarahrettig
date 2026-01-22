"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectTopics } from "@/app/components/project-topics";
import Image from "next/image";
import { ImageSlider } from "../../components/image-slider";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		topics?: string[];
		heroImage?: string;
		heroImages?: string[];
		jobTitle?: string;
		companyName?: string;
	};
};
export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const searchParams = useSearchParams();
	const fromCourses = searchParams?.get("from") === "courses";
	const backLink = fromCourses ? "/courses" : "/projects";

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
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
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
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
					
					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<Link target="_blank" key={link.label} href={link.href}>
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
					{project.heroImages && project.heroImages.length > 0 && (
  <div className="mx-auto mt-10 max-w-5xl w-full px-6">
    <ImageSlider 
      images={project.heroImages.map((src, index) => ({
        src,
        alt: `${project.title} - Image ${index + 1}`,
		href: src
      }))} 
    />
  </div>
)}

				</div>
			</div>
		</header>
	);
};
