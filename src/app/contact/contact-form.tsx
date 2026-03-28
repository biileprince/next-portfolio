"use client";

import { useActionState } from "react";
import { submitContactForm } from "./actions";
import { FiSend } from "react-icons/fi";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="glass rounded-xl p-8 space-y-6">
      {state.message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            state.success
              ? "bg-success/10 border border-success/20 text-success"
              : "bg-error/10 border border-error/20 text-error"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm text-surface-400">Full Name *</label>
          <input
            id="contact-name"
            name="name"
            className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors"
            placeholder="John Doe"
            disabled={isPending}
            required
          />
          {state.errors?.name && (
            <p className="text-xs text-error">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-phone" className="text-sm text-surface-400">Phone Number *</label>
          <input
            id="contact-phone"
            name="phone"
            className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors"
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
        <label htmlFor="contact-email" className="text-sm text-surface-400">Email Address *</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors"
          placeholder="you@example.com"
          disabled={isPending}
          required
        />
        {state.errors?.email && (
          <p className="text-xs text-error">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm text-surface-400">Subject *</label>
        <input
          id="contact-subject"
          name="subject"
          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors"
          placeholder="Project Inquiry"
          disabled={isPending}
          required
        />
        {state.errors?.subject && (
          <p className="text-xs text-error">{state.errors.subject[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm text-surface-400">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:border-brand-400 transition-colors resize-none"
          placeholder="Let's discuss your project..."
          disabled={isPending}
          required
        />
        {state.errors?.message && (
          <p className="text-xs text-error">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
      >
        {isPending ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <FiSend className="text-lg" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
