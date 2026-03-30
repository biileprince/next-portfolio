import type { Metadata } from 'next';
import { DashboardNav } from './components/dashboard-nav';

export const metadata: Metadata = {
  title: 'Dashboard | Prince Biile',
  description: 'Admin dashboard for portfolio management',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-surface-900 text-surface-200">
      <DashboardNav />

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 lg:p-10 overflow-x-hidden min-h-screen">
        <div className="max-w-6xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
