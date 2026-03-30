"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markMessageAsRead(id: number) {
  try {
    await db.update(messages).set({ isRead: true }).where(eq(messages.id, id));
    revalidatePath("/dashboard/messages");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Failed to mark message as read:", err);
    return { success: false, message: "Failed to update message" };
  }
}

export async function deleteMessage(id: number) {
  try {
    await db.delete(messages).where(eq(messages.id, id));
    revalidatePath("/dashboard/messages");
    revalidatePath("/dashboard");
    return { success: true, message: "Message deleted" };
  } catch (err) {
    console.error("Failed to delete message:", err);
    return { success: false, message: "Failed to delete message" };
  }
}
