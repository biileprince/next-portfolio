import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById, getAllProjects } from "@/lib/queries/projects";
import { BsGithub } from "react-icons/bs";
import { FaGlobe, FaArrowLeft } from "react-icons/fa";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
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

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(parseInt(id, 10));

  if (!project) notFound();

  const tags = project.tags as string[];
  const techStack = project.techStack as string[];
  const features = project.features as string[];

  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-surface-400 hover:text-white mb-8 transition-colors focus-ring rounded-lg px-2 py-1"
        >
          <FaArrowLeft className="text-sm" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-lg text-surface-400 leading-relaxed">{project.description}</p>
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 glass">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-surface-200 hover:text-white hover:border-brand-500/30 transition-all focus-ring"
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
          <h2 className="text-xl font-semibold text-surface-100 mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-surface-100 mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm rounded-full glass text-surface-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-surface-100 mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 glass rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center text-xs text-brand-400 font-semibold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-surface-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
