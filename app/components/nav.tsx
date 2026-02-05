"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";


export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 bottom-0 z-50 duration-200 border-t  ${
					isIntersecting
						? "bg-white border-transparent"
						: "bg-white  border-zinc-800 "
				}`}
			>
		
	 		<div className="container flex items-center justify-between px-4 py-4 mx-auto">
					<div className="flex items-center gap-8">
						<div className="hidden md:flex gap-8">
							<Link
								href="/projects"
								className="duration-200 text-black hover:text-black"
							>
								Projects
							</Link>
								<Link
								href="https://drive.google.com/file/d/1ciS0_BLVzV3XoPgdwl5MO4eIXh9_me0d/view?usp=sharing"
								className="duration-200 text-black hover:text-black"
							>
								Resume
							</Link>
							<Link
								href="/contact"
								className="duration-200 text-black hover:text-black"
							>
								Contact Me
							</Link>
						</div>
						<button
							className="md:hidden flex w-full items-center justify-center px-4 border border-black bg-white py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							aria-controls="primary-navigation"
							aria-expanded={isMenuOpen}
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							{isMenuOpen ? "Close" : "Menu"}
						</button>
					</div>

					<div className="flex items-center gap-4">
					</div>
				</div>

				{isMenuOpen && (
					<div
						id="primary-navigation"
						className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-zinc-900/95 text-white md:hidden"
					>
						<Link
							href="/projects"
							onClick={() => setIsMenuOpen(false)}
							className="text-xl font-semibold uppercase tracking-wide"
						>
							Projects
						</Link>
						<Link
							href="/contact"
							onClick={() => setIsMenuOpen(false)}
							className="text-xl font-semibold uppercase tracking-wide"
						>
							Contact Me
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};
