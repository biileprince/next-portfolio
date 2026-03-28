import type { Metadata } from "next";
import { getAllProjects } from "@/lib/queries/projects";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore all projects by Prince Biile — web applications, e-commerce platforms, and full-stack solutions.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsClient projects={projects} />;
}
