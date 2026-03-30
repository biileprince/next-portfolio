import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { MessagesClient } from "./messages-client";

export default async function MessagesDashboard() {
  const allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt));

  return <MessagesClient messages={allMessages} />;
}
