import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function MessagesDashboard() {
  const allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Messages</h1>
        <p className="text-surface-400">Inquiries from your portfolio contact form.</p>
      </div>

      <div className="grid gap-4">
        {allMessages.map((msg) => (
          <div key={msg.id} className={`p-6 rounded-lg border ${msg.isRead ? 'bg-surface-800/50 border-surface-700/50' : 'bg-surface-800 border-surface-600 shadow-md'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{msg.subject}</h3>
                <div className="text-sm text-surface-400 flex items-center gap-2">
                  <span className="text-brand-400 font-medium">{msg.name}</span>
                  <span>&bull;</span>
                  <a href={`mailto:${msg.email}`} className="hover:underline hover:text-white">{msg.email}</a>
                  <span>&bull;</span>
                  <span>{msg.phone}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-surface-500 mb-2">{new Date(msg.createdAt).toLocaleString()}</p>
                {!msg.isRead && <span className="px-2 py-1 bg-brand-500/10 text-brand-400 text-xs rounded-full">New</span>}
              </div>
            </div>
            <div className="text-sm text-surface-300 bg-surface-900/50 p-4 rounded-md whitespace-pre-wrap leading-relaxed border border-surface-700/30">
              {msg.message}
            </div>
          </div>
        ))}

        {allMessages.length === 0 && (
          <div className="p-10 text-center text-surface-400 glass rounded-xl border border-surface-700/50">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
