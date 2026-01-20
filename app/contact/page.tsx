"use client";
import { Github, Linkedin, Mail, X } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/sarahkimirettig/",
		label: "LinkedIn",
		handle: "@sarahkimirettig",
	},
	{
		icon: <Mail size={20} />,
		href: "https://letterbird.co/sarahkimirettig",
		label: "Contact Form",
		handle: "Sarah Rettig",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/kimieatscode",
		label: "Github",
		handle: "KimiEatsCode",
	},
];

export default function Example() {
	return (
		<div className="bg-white">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<Card>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
							>
							
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-white group-hover:text-black group-hover:bg-black border-black bg-black group-hover:border-black">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-black group-hover:text-black font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-black group-hover:text-black">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
