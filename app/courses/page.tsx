import Link from "next/link";
import { Navigation } from "@/app/components/nav";
import { CourseCard } from "./course-card";
import { allProjects } from "contentlayer/generated";

export const metadata = {
  title: "All Projects",
  description: "View all projects",
};

export const revalidate = 0; // Disable caching for this page

export default async function CoursesPage() {
  const projects = allProjects.filter((project) => project.published);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold text-black sm:text-5xl">
            All Projects
          </h1>
          <p className="text-lg text-black">
            Browse through all available projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <CourseCard
              key={project.slug}
              project={project}
              progress={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
