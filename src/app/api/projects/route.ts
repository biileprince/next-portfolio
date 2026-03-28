import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";
import { createProjectSchema } from "@/lib/validations/project";

export async function GET() {
  try {
    const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder));
    const parsed = rows.map((row) => ({
      ...row,
      tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
      techStack: typeof row.techStack === "string" ? JSON.parse(row.techStack) : row.techStack,
      features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const result = await db.insert(projects).values({
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || "",
      tags: JSON.stringify(data.tags),
      techStack: JSON.stringify(data.techStack),
      features: JSON.stringify(data.features),
      githubUrl: data.githubUrl || "",
      liveUrl: data.liveUrl || "",
      featured: data.featured,
      sortOrder: data.sortOrder,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
