import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExpertiseBySlug } from "@/lib/queries/expertise";
import { ExpertiseClient } from "./expertise-client";

const validSlugs = [
  "web-development",
  "analytics",
  "seo-optimization",
  "database-management",
  "cloud-computing",
];

interface ExpertisePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ExpertisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getExpertiseBySlug(slug);
  if (!data) return { title: "Expertise Not Found" };

  return {
    title: data.title,
    description: data.description || `${data.title} expertise by Prince Biile`,
  };
}

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const { slug } = await params;
  const data = await getExpertiseBySlug(slug);

  if (!data) notFound();

  return <ExpertiseClient data={data} />;
}
