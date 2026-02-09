"use client";

import React, { useState } from "react";
import Image from "next/image";

type SliderImage = {
	src: string;
	alt: string;
	href?: string;
	caption?: string;
};

type ImageSliderProps = {
	images: SliderImage[];
	className?: string;
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, className = "" }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const numberOfImages = images.length;

	const goToNext = () => {
		setCurrentIndex((prevIndex) => 
			prevIndex < numberOfImages - 1 ? prevIndex + 1 : 0
		);
	};

	const goToPrev = () => {
		setCurrentIndex((prevIndex) => 
			prevIndex > 0 ? prevIndex - 1 : numberOfImages - 1
		);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	if (!images || images.length === 0) {
		return null;
	}

	return (
		<section 
			className={`gallery-section w-full ${className}`}
			aria-roledescription="image slider"
			aria-label="Image gallery slider"
		>
			{/* Images Container with Controls */}
			<div className="relative w-full overflow-hidden rounded-lg pb-6 shadow-2xl bg-zinc-100">
				<div className="relative w-full aspect-[16/9] min-h-[400px]">
					{/* Next/Prev Controls */}
					<div className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none">
						<button
							type="button"
							onClick={goToPrev}
							className="pointer-events-auto bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
							aria-label="Previous Image"
						>
							<svg 
								aria-hidden="true" 
								xmlns="http://www.w3.org/2000/svg" 
								viewBox="0 -960 960 960"
								className="w-8 h-8 fill-current"
							>
								<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
							</svg>
						</button>
						<button
							type="button"
							onClick={goToNext}
							className="pointer-events-auto bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
							aria-label="Next Image"
						>
							<svg 
								aria-hidden="true" 
								xmlns="http://www.w3.org/2000/svg" 
								viewBox="0 -960 960 960"
								className="w-8 h-8 fill-current"
							>
								<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
							</svg>
						</button>
					</div>

					{/* Image Slides */}
					{images.map((image, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-500 ${
								index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
							}`}
						>
							<a
								href={image.href ?? image.src}
								className="block h-full w-full"
								aria-label={`Open ${image.alt || `image ${index + 1}`}`}
							>
								<Image
									src={image.src}
									alt={image.alt}
									width={1400}
									height={750}
									className="w-full h-full object-cover"
									priority={index === 0}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
								{image.caption && (
									<p className="pointer-events-none absolute left-4 right-4 bottom-4 rounded-2xl bg-black/70 px-4 py-2 text-sm text-white shadow-lg backdrop-blur">
										{image.caption}
									</p>
								)}
								<span
									className="pointer-events-none absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur"
									aria-hidden="true"
								>
									<svg
										viewBox="0 0 24 24"
										className="h-6 w-6 fill-current"
										aria-hidden="true"
									>
										<path d="M7 3H3v4h2V5h2V3zm12 0h-4v2h2v2h2V3zM5 17H3v4h4v-2H5v-2zm16 0h-2v2h-2v2h4v-4zM10 10h4v4h-4z" />
									</svg>
								</span>
							</a>
						</div>
					))}
				</div>
			</div>

			{/* Dot Navigation */}
			{/* <div className="mt-8 mb-10 flex justify-center">
				<ol role="list" className="flex gap-4">
					{images.map((image, index) => (
						<li key={index}>
							<button
								type="button"
								onClick={() => goToSlide(index)}
								className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
									index === currentIndex 
										? "bg-black w-12" 
										: "bg-zinc-400 hover:bg-zinc-600 w-3"
								}`}
								aria-current={index === currentIndex}
								aria-label={`${image.alt || `Image ${index + 1}`}`}
							/>
						</li>
					))}
				</ol>
			</div> */}
		</section>
	);
};
