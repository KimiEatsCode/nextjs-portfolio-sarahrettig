"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FeaturedProject = {
	title: string;
	description: string;
	slug: string;
	heroImageSrc: string;
	heroImageAlt: string;
};

type FeaturedProjectSliderProps = {
	projects: FeaturedProject[];
};

export const FeaturedProjectSlider: React.FC<FeaturedProjectSliderProps> = ({ projects }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!projects || projects.length === 0) return null;

	const total = projects.length;

	const goToNext = () => setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
	const goToPrev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : total - 1));
	const goToSlide = (index: number) => setCurrentIndex(index);

	return (
		<section
			className="w-full"
			aria-roledescription="carousel"
			aria-label="Featured projects"
		>
			<div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-100">
				{/* Slides */}
				<div className="relative w-full aspect-[16/7] min-h-[320px]">
					{projects.map((project, index) => (
						<div
							key={project.slug}
							className={`absolute inset-0 transition-opacity duration-500 ${
								index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
							}`}
							aria-hidden={index !== currentIndex}
						>
							<Image
								src={project.heroImageSrc}
								alt={project.heroImageAlt}
								fill
								className="object-cover"
								priority={index === 0}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
							/>

							{/* Dark gradient overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent" />

							{/* Project info overlay */}
							<div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
								<p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
									Featured Project
								</p>
								<h3 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight">
									{project.title}
								</h3>
								<p className="text-sm md:text-base text-white/80 mb-4 max-w-xl line-clamp-2">
									{project.description}
								</p>
								<Link
									href={`/projects/${project.slug}`}
									className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg hover:bg-zinc-100 transition-colors duration-200"
								>
									View Project
									<svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
										<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
									</svg>
								</Link>
							</div>
						</div>
					))}

					{/* Prev / Next buttons */}
					{total > 1 && (
						<div className="absolute inset-0 z-30 flex items-center justify-between px-3 pointer-events-none">
							<button
								type="button"
								onClick={goToPrev}
								className="pointer-events-auto bg-black/70 hover:bg-black text-white rounded-full p-2 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
								aria-label="Previous featured project"
							>
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -960 960 960"
									className="w-7 h-7 fill-current"
								>
									<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
								</svg>
							</button>
							<button
								type="button"
								onClick={goToNext}
								className="pointer-events-auto bg-black/70 hover:bg-black text-white rounded-full p-2 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
								aria-label="Next featured project"
							>
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -960 960 960"
									className="w-7 h-7 fill-current"
								>
									<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
								</svg>
							</button>
						</div>
					)}
				</div>

				
			</div>
		</section>
	);
};
