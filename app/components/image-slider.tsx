"use client";

import React, { useState } from "react";
import Image from "next/image";

type ImageSliderProps = {
	images: {
		src: string;
		alt: string;
	}[];
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
			<div className="relative w-full overflow-hidden rounded-lg shadow-2xl bg-zinc-100">
				<div className="relative w-full aspect-[16/9] min-h-[400px]">
					{/* Next/Prev Controls */}
					<div className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none">
						<button
							type="button"
							onClick={goToPrev}
							className="pointer-events-auto bg-black/80 hover:bg-black text-white rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
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
							className="pointer-events-auto bg-black/80 hover:bg-black text-white rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
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
							<Image
								src={image.src}
								alt={image.alt}
								width={1600}
    						    height={900}
								className="w-full h-full object-contain"
								priority={index === 0}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Dot Navigation */}
			<div className="mt-8 flex justify-center">
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
			</div>
		</section>
	);
};
