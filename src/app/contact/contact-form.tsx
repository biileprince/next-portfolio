"use client";

import { useActionState, useEffect } from "react";
import { submitContactForm } from "./actions";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="glass rounded-xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-muted-foreground">
            Full Name *
          </Label>
          <Input
            id="contact-name"
            name="name"
            className="w-full bg-muted border-border focus:border-brand-400 transition-colors"
            placeholder="Your full name"
            disabled={isPending}
            required
          />
          {state.errors?.name && (
            <p className="text-xs text-error">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone" className="text-muted-foreground">
            Phone Number *
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            className="w-full bg-muted border-border focus:border-brand-400 transition-colors"
            placeholder="+233 555 902 675"
            disabled={isPending}
            required
          />
          {state.errors?.phone && (
            <p className="text-xs text-error">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email" className="text-muted-foreground">
          Email Address *
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          className="w-full bg-muted border-border focus:border-brand-400 transition-colors"
          placeholder="Enter your email address"
          disabled={isPending}
          required
        />
        {state.errors?.email && (
          <p className="text-xs text-error">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className="text-muted-foreground">
          Subject *
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          className="w-full bg-muted border-border focus:border-brand-400 transition-colors"
          placeholder="Project Inquiry"
          disabled={isPending}
          required
        />
        {state.errors?.subject && (
          <p className="text-xs text-error">{state.errors.subject[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-muted-foreground">
          Message *
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full bg-muted border-border focus:border-brand-400 transition-colors resize-none"
          placeholder="Let's discuss your project..."
          disabled={isPending}
          required
        />
        {state.errors?.message && (
          <p className="text-xs text-error">{state.errors.message[0]}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium shadow-lg shadow-brand-500/20"
      >
        {isPending ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="flex items-center gap-2.5">
            <FiSend className="text-lg" />
            <span>Send Message</span>
          </div>
        )}
      </Button>
    </form>
  );
}
