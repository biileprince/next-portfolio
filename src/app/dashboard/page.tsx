import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { projects, messages, experience, skills } from "@/db/schema";
import {
  FolderKanban,
  Mail,
  BellRing,
  Briefcase,
  Code2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const allProjects = await db.select().from(projects);
  const allMessages = await db.select().from(messages);
  const allExperience = await db.select().from(experience);
  const allSkills = await db.select().from(skills);
  const unreadMessages = allMessages.filter((m) => !m.isRead);

  const stats = [
    {
      label: "Total Projects",
      value: allProjects.length,
      icon: FolderKanban,
      color: "text-brand-400",
      bgColor: "bg-brand-500/10",
      href: "/dashboard/projects",
    },
    {
      label: "Unread Messages",
      value: unreadMessages.length,
      icon: BellRing,
      color: "text-warning",
      bgColor: "bg-warning/10",
      href: "/dashboard/messages",
    },
    {
      label: "Total Inquiries",
      value: allMessages.length,
      icon: Mail,
      color: "text-success",
      bgColor: "bg-success/10",
      href: "/dashboard/messages",
    },
    {
      label: "Experience Items",
      value: allExperience.length,
      icon: Briefcase,
      color: "text-brand-300",
      bgColor: "bg-brand-300/10",
      href: "/dashboard/resume",
    },
    {
      label: "Skills Tracked",
      value: allSkills.length,
      icon: Code2,
      color: "text-brand-200",
      bgColor: "bg-brand-200/10",
      href: "/dashboard/resume",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Overview
        </h1>
        <p className="text-surface-400">
          Welcome back, Prince. Here&apos;s a summary of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="bg-surface-800 border-surface-700 text-white hover:border-surface-600 transition-colors cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-surface-400">
                  {stat.label}
                </CardTitle>
                <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/projects">
          <Card className="bg-surface-800 border-surface-700 text-white hover:border-brand-500/30 hover:shadow-glow transition-all cursor-pointer group p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Manage Projects</h3>
                <p className="text-sm text-surface-400">
                  Add, edit, or remove projects
                </p>
              </div>
              <ArrowRight className="text-surface-500 group-hover:text-brand-400 transition-colors" />
            </div>
          </Card>
        </Link>
        <Link href="/dashboard/messages">
          <Card className="bg-surface-800 border-surface-700 text-white hover:border-brand-500/30 hover:shadow-glow transition-all cursor-pointer group p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">View Messages</h3>
                <p className="text-sm text-surface-400">
                  {unreadMessages.length} unread inquiries
                </p>
              </div>
              <ArrowRight className="text-surface-500 group-hover:text-brand-400 transition-colors" />
            </div>
          </Card>
        </Link>
        <Link href="/dashboard/resume">
          <Card className="bg-surface-800 border-surface-700 text-white hover:border-brand-500/30 hover:shadow-glow transition-all cursor-pointer group p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Resume Data</h3>
                <p className="text-sm text-surface-400">
                  Experience, education & skills
                </p>
              </div>
              <ArrowRight className="text-surface-500 group-hover:text-brand-400 transition-colors" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Recent Inquiries
          </h2>
          <Link
            href="/dashboard/messages"
            className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="rounded-xl border border-surface-700 bg-surface-800/50 overflow-hidden">
          <div className="divide-y divide-surface-700/50">
            {allMessages.slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                className="flex justify-between items-start p-4 hover:bg-surface-700/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">
                      {msg.subject}
                    </p>
                    {!msg.isRead && (
                      <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-400 text-[10px] rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-surface-400">
                    {msg.name} ({msg.email})
                  </p>
                </div>
                <span className="text-xs text-surface-500 shrink-0 ml-4">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {allMessages.length === 0 && (
              <div className="text-sm text-surface-400 p-6 text-center">
                No messages yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
