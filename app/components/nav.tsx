"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RESUME_URL } from "../constants";


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
		<header ref={ref} className={`w-full ${isIntersecting ? "bg-transparent" : "bg-transparent"}`}>
			{/* Name row (always) + desktop nav */}
			<div className="flex w-full items-center justify-between px-4 md:px-8 py-4">
				<Link href="/" className="font-display text-xl text-black hover:text-black">
					sarah kimi rettig
				</Link>
				<div className="hidden md:flex gap-8 items-center">
					<Link href="/projects" className="text-black hover:text-black">
						Projects
					</Link>
					<Link href={RESUME_URL} className="text-black hover:text-black">
						Resume
					</Link>
					<Link href="/contact" className="text-black hover:text-black">
						Contact Me
					</Link>
				</div>
			</div>

			{/* Mobile: full-width menu toggle button directly under name */}
			<div className="md:hidden w-full px-0">
				<a
					href="#"
					role="button"
					className="flex w-full items-center justify-between gap-2 bg-white px-4 py-3 text-lg font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
					aria-controls="primary-navigation"
					aria-expanded={isMenuOpen}
					onClick={(event) => {
						event.preventDefault();
						setIsMenuOpen((prev) => !prev);
					}}
				>
					{isMenuOpen ? (
						<>
							
							
						</>
					) : (
						<>
							<span>Menu</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						</>
					)}
				</a>
			</div>

			{/* Mobile: full-width dropdown menu */}
			{isMenuOpen && (
				<nav
					id="primary-navigation"
					className="md:hidden w-full flex flex-col"
					aria-live="polite"
				>
					<button
						type="button"
						onClick={() => setIsMenuOpen(false)}
						className="flex w-full items-center justify-between px-4 py-4 text-left text-lg font-semibold uppercase tracking-wide hover:bg-zinc-50"
						aria-label="Close menu"
					>
						<span>Menu</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
					<Link
						href="/projects"
						onClick={() => setIsMenuOpen(false)}
						className="block w-full px-4 py-4 text-left text-lg font-semibold uppercase tracking-wide hover:bg-zinc-50"
					>
						Projects
					</Link>
					<Link
						href={RESUME_URL}
						onClick={() => setIsMenuOpen(false)}
						className="block w-full px-4 py-4 text-left text-lg font-semibold uppercase tracking-wide hover:bg-zinc-50"
					>
						Resume
					</Link>
					<Link
						href="/contact"
						onClick={() => setIsMenuOpen(false)}
						className="block w-full px-4 py-4 text-left text-lg font-semibold uppercase tracking-wide hover:bg-zinc-50"
					>
						Contact Me
					</Link>
				</nav>
			)}
		</header>
	);
};
