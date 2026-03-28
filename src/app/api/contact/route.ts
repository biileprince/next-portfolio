import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // Insert message into the database
    await db.insert(messages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    console.log("📧 Contact API submission saved to DB:", parsed.data);

    return NextResponse.json({
      message: `Thank you ${parsed.data.name}, your message has been received!`,
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 });
  }
}
