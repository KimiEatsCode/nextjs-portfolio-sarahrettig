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
			<div className="flex w-full items-center justify-between px-4 md:px-4 py-4">
				<Link href="/" className="font-display text-2xl text-black hover:text-black">
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
						Contact
					</Link>
				</div>
			</div>

			{/* Mobile: half-width menu toggle button directly under name */}
			<div className="md:hidden w-half px-0">
				<a
					href="#"
					role="button"
					className="flex w-half items-center justify-between gap-2 bg-white px-4 py-3 text-lg font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
							<span className="w-full">Menu</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<line x1="3" y1="3" x2="21" y2="6" />
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
					className="md:hidden w-half flex flex-col"
					aria-live="polite"
				>
					<button
						type="button"
						onClick={() => setIsMenuOpen(false)}
						className="flex w-full items-center justify-between px-4 py-4 text-left text-lg font-semibold uppercase tracking-wide hover:bg-zinc-50"
						aria-label="Close menu"
					>
						<span>Menu</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
						<line y2="28" y1="12" x1="10" x2="25"></line><line y2="28" y1="12" x2="10" x1="25"></line>
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
						Contact
					</Link>
				</nav>
			)}
		</header>
	);
};
