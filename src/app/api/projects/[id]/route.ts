import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateProjectSchema } from "@/lib/validations/project";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const rows = await db.select().from(projects).where(eq(projects.id, parseInt(id, 10))).limit(1);

    if (!rows[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const row = rows[0];
    return NextResponse.json({
      ...row,
      tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
      techStack: typeof row.techStack === "string" ? JSON.parse(row.techStack) : row.techStack,
      features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
    if (data.techStack !== undefined) updateData.techStack = JSON.stringify(data.techStack);
    if (data.features !== undefined) updateData.features = JSON.stringify(data.features);
    if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;
    if (data.liveUrl !== undefined) updateData.liveUrl = data.liveUrl;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

    const result = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, parseInt(id, 10)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id, 10)))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
