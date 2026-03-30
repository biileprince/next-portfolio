import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, getAllProjects } from "@/lib/queries/projects";
import { BsGithub } from "react-icons/bs";
import { FaGlobe, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectGallery from "./project-gallery";

export const dynamic = "force-dynamic";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(parseInt(id, 10));
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.imageUrl ? [project.imageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(parseInt(id, 10));

  if (!project) notFound();

  // Get all projects for prev/next navigation
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const tags = project.tags as string[];
  const techStack = project.techStack as string[];
  const features = project.features as string[];
  const galleryImages = (project.galleryImages as string[]).filter(
    (image) => image && image.trim() !== "",
  );

  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors focus-ring rounded-lg px-2 py-1"
        >
          <FaArrowLeft className="text-sm" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <ProjectGallery
          mainImageUrl={project.imageUrl}
          images={galleryImages}
          title={project.title}
          projectId={project.id}
        />

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-foreground hover:border-brand-500/30 transition-all focus-ring"
            >
              <BsGithub className="text-lg" />
              View Source
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 focus-ring"
            >
              <FaGlobe className="text-lg" />
              Live Demo
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-brand-500/10 text-brand-400 border-brand-500/20 px-3 py-1.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="glass px-3 py-1.5"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 glass rounded-lg"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center text-xs text-brand-400 font-semibold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prev / Next Navigation */}
        <Separator className="my-10" />
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Previous
                </p>
                <p className="text-sm font-medium">{prevProject.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Next
                </p>
                <p className="text-sm font-medium">{nextProject.title}</p>
              </div>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
