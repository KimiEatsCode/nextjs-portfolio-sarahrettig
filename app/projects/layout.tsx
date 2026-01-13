export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-amber-900 via-oatmeal-400/10 to-rose-900 ">
			{children}
		</div>
	);
}
