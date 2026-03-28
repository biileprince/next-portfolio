"use server";

import { contactSchema } from "@/lib/validations/contact";
import type { ContactFormState } from "@/types";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: fieldErrors,
    };
  }

  // In production, integrate with an email service (e.g., Resend, SendGrid, Nodemailer)
  // For now, we log the submission and return success
  console.log("📧 Contact form submission:", parsed.data);

  return {
    success: true,
    message: `Thank you ${parsed.data.name}, your message has been received! I'll get back to you soon.`,
  };
}
