import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, FileText, Mail, Settings, LogOut, CodeSquare } from 'lucide-react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | Prince Biile',
  description: 'Admin dashboard for portfolio management',
};

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Resume', href: '/dashboard/resume', icon: FileText },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-surface-900 text-surface-200">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-surface-700/50 bg-surface-800/50 backdrop-blur-xl p-4 gap-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 text-xl font-bold text-white tracking-tight">
          <CodeSquare className="text-brand-400" />
          <span>Admin Panel</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-surface-400 hover:text-white hover:bg-surface-700/50"
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-surface-700/50 pt-4 pb-2 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-surface-400 hover:text-white hover:bg-surface-700/50"
          >
            ← Back to Portfolio
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left text-error/80 hover:text-error hover:bg-error/10"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 lg:p-10 overflow-x-hidden min-h-screen">
        <div className="max-w-6xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Nav Placeholder (You can expand this later) */}
      <div className="lg:hidden p-4 border-b border-surface-700/50 flex justify-between items-center bg-surface-800">
        <div className="font-bold flex items-center gap-2"><CodeSquare className="text-brand-400 w-5 h-5" /> Admin Panel</div>
        <Link href="/" className="text-sm text-surface-400">Exit</Link>
      </div>
    </div>
  );
}
