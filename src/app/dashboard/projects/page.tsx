import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/db";
import { projects } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function ProjectsDashboard() {
  const allProjects = await db.select().from(projects).orderBy(asc(projects.sortOrder));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Projects</h1>
        <p className="text-surface-400">Manage your portfolio projects. Adding/editing via form integration is planned for phase 3, right now you can view the live database dump.</p>
      </div>

      <div className="rounded-md border border-surface-700 bg-surface-800">
        <Table>
          <TableHeader className="bg-surface-900 border-b border-surface-700">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProjects.map((p) => (
              <TableRow key={p.id} className="border-b border-surface-700 hover:bg-surface-700/50 transition-colors">
                <TableCell className="font-medium text-surface-400">{p.sortOrder}</TableCell>
                <TableCell className="font-semibold text-white">{p.title}</TableCell>
                <TableCell>
                  {p.featured ? (
                    <span className="px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full text-xs">Yes</span>
                  ) : (
                    <span className="px-2 py-1 bg-surface-700 text-surface-400 rounded-full text-xs">No</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-surface-400 flex gap-2">
                  {p.githubUrl && p.githubUrl !== "#" && <a href={p.githubUrl} target="_blank" className="hover:text-white underline">Code</a>}
                  {p.liveUrl && p.liveUrl !== "#" && <a href={p.liveUrl} target="_blank" className="hover:text-white underline">Live</a>}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {/* Future: Edit/Delete buttons triggering dialogs */}
                  <span className="text-brand-400 cursor-pointer hover:underline mx-2">Edit</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
