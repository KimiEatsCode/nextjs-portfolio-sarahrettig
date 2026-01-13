import Link from "next/link";
import { Navigation } from "@/app/components/nav";

export default function NotFound() {
  return (
    <div className="relative pb-16 min-h-screen">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Topic Not Found
          </h2>
          <p className="mt-4 text-zinc-400">
            Sorry, we couldn't find any projects with this tag.
          </p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 underline"
            >
              &larr; Back to all projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
