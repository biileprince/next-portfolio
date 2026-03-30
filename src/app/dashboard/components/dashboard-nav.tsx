"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, FileText, Mail, LogOut,
  CodeSquare, Menu, X, ArrowLeft,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Resume", href: "/dashboard/resume", icon: FileText },
  { name: "Messages", href: "/dashboard/messages", icon: Mail },
];

function NavItem({ item, isActive, onClick }: { item: typeof navigation[0]; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
          : "text-surface-400 hover:text-white hover:bg-surface-700/50"
      }`}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      {item.name}
    </Link>
  );
}

export function DashboardNav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-surface-700/50 bg-surface-800/50 backdrop-blur-xl p-4 gap-6 sticky top-0 h-screen shrink-0">
        <div className="flex items-center gap-2 px-2 text-xl font-bold text-white tracking-tight">
          <CodeSquare className="text-brand-400" />
          <span>Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>

        <Separator className="bg-surface-700/50" />

        <div className="space-y-1 pb-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-surface-400 hover:text-white hover:bg-surface-700/50"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            Back to Portfolio
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

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-surface-700/50 bg-surface-800/95 backdrop-blur-xl">
        <div className="font-bold flex items-center gap-2 text-white">
          <CodeSquare className="text-brand-400 w-5 h-5" />
          Admin Panel
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 text-surface-300 hover:text-white hover:bg-surface-700/50 transition-colors">
              <Menu size={22} />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-surface-900 border-surface-700 p-0">
            <SheetHeader className="p-5 border-b border-surface-700/50">
              <SheetTitle className="flex items-center gap-2 text-lg font-bold text-white">
                <CodeSquare className="text-brand-400" />
                Admin Panel
              </SheetTitle>
            </SheetHeader>

            <nav className="p-4 space-y-1.5">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
                  onClick={() => setSheetOpen(false)}
                />
              ))}
            </nav>

            <Separator className="bg-surface-700/50 mx-4" />

            <div className="p-4 space-y-1">
              <Link
                href="/"
                onClick={() => setSheetOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-surface-400 hover:text-white hover:bg-surface-700/50"
              >
                <ArrowLeft className="w-5 h-5 shrink-0" />
                Back to Portfolio
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
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
