"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";


export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const { data: session } = useSession();

	const callbackUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/courses"
			: "/courses";

	const providers = [
		{
			id: "github",
			label: "Login with GitHub",
		},
		{
			id: "google",
			label: "Login with Gmail",
		},
	];

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
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/projects"
							className="duration-200 text-black hover:text-black"
						>
							Projects
						</Link>
						<Link
							href="/courses"
							className="duration-200 text-black hover:text-black"
						>
							Favorites
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-black hover:text-black"
						>
							Connect
						</Link>
					</div>

					<div className="flex items-center gap-4">
						{session ? (
							<button
								onClick={() => signOut()}
								className="text-sm text-black hover:text-black"
							>
								Sign out
							</button>
						) : (
							<>
								{providers.map((provider) => (
									<button
										key={provider.id}
										type="button"
										onClick={() => signIn(provider.id, { callbackUrl })}
										className="flex w-full items-center justify-center rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
									>
										{provider.label}
									</button>
								))}
							</>
						)}
						
						<Link
							href="/"
							className="duration-200 text-black hover:text-black"
						>
							<ArrowLeft className="w-6 h-6 " />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
