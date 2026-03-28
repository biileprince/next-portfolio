import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().regex(/^\+?233[0-9]{9}$/, "Valid Ghanaian phone number required (e.g., +233...)"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
