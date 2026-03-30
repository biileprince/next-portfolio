"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { markMessageAsRead, deleteMessage } from "./actions";
import { CheckCheck, Trash2, Mail, Clock } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface MessagesClientProps {
  messages: Message[];
}

export function MessagesClient({ messages }: MessagesClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = (id: number) => {
    startTransition(async () => {
      const res = await markMessageAsRead(id);
      if (res.success) toast.success("Marked as read");
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const res = await deleteMessage(id);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Messages</h1>
          <p className="text-surface-400">
            {messages.length} total • {messages.filter(m => !m.isRead).length} unread
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-xl border transition-all ${
              msg.isRead
                ? "bg-surface-800/30 border-surface-700/50"
                : "bg-surface-800 border-surface-600 shadow-lg shadow-brand-500/5"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white truncate">{msg.subject}</h3>
                  {!msg.isRead && (
                    <Badge variant="secondary" className="bg-brand-500/10 text-brand-400 border-brand-500/20">
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-400 flex-wrap">
                  <span className="text-brand-400 font-medium">{msg.name}</span>
                  <span>•</span>
                  <a href={`mailto:${msg.email}`} className="hover:underline hover:text-white">{msg.email}</a>
                  {msg.phone && (
                    <>
                      <span>•</span>
                      <span>{msg.phone}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4 shrink-0">
                <div className="flex items-center gap-1 text-xs text-surface-500">
                  <Clock size={12} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>

                {!msg.isRead && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkRead(msg.id)}
                    disabled={isPending}
                    className="h-8 w-8 text-surface-400 hover:text-success hover:bg-success/10"
                    title="Mark as read"
                  >
                    <CheckCheck size={16} />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(msg.id)}
                  disabled={isPending}
                  className="h-8 w-8 text-surface-400 hover:text-error hover:bg-error/10"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="text-sm text-surface-300 bg-surface-900/50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed border border-surface-700/30">
              {msg.message}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-14 text-center text-surface-400 glass rounded-xl border border-surface-700/50 space-y-3">
            <Mail size={40} className="mx-auto text-surface-600" />
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">Messages from your contact form will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
