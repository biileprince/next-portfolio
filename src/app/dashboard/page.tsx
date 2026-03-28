import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/db";
import { projects, messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FolderKanban, Mail, BellRing } from "lucide-react";

export default async function DashboardOverview() {
  const allProjects = await db.select().from(projects);
  const allMessages = await db.select().from(messages);
  const unreadMessages = allMessages.filter(m => !m.isRead);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
        <p className="text-surface-400">Welcome back. Here's a summary of your portfolio data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-surface-800 border-surface-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allProjects.length}</div>
            <p className="text-xs text-surface-400">
              Live in your portfolio
            </p>
          </CardContent>
        </Card>
        <Card className="bg-surface-800 border-surface-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <BellRing className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages.length}</div>
            <p className="text-xs text-surface-400">
              From contact form
            </p>
          </CardContent>
        </Card>
        <Card className="bg-surface-800 border-surface-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Mail className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allMessages.length}</div>
            <p className="text-xs text-surface-400">
              Historical submissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages Preview */}
      <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">Recent Inquiries</h2>
      <div className="rounded-md border border-surface-700 bg-surface-800/50">
        <div className="p-4 space-y-4">
          {unreadMessages.slice(0, 5).map((msg) => (
            <div key={msg.id} className="flex justify-between items-start pb-4 border-b border-surface-700 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-white">{msg.subject}</p>
                <p className="text-sm text-surface-400">{msg.name} ({msg.email})</p>
              </div>
              <span className="text-xs text-surface-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
          {unreadMessages.length === 0 && (
            <div className="text-sm text-surface-400 p-4 text-center">No unread messages.</div>
          )}
        </div>
      </div>
    </div>
  );
}
