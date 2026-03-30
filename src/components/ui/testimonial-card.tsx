"use client";

import Image from "next/image";
import { RiStarFill } from "react-icons/ri";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="glass rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <Image
            src={testimonial.imageUrl || "/images/avatar-3.png"}
            alt={testimonial.name}
            width={56}
            height={56}
            className="rounded-full object-cover border-2 border-brand-400/30"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground truncate">
            {testimonial.name}
          </h4>
          <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
          <div className="flex gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} className="text-sm text-brand-400" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex-1">
        <span className="absolute -top-2 -left-1 text-4xl text-brand-400/10 font-serif leading-none">
          &ldquo;
        </span>
        <p className="text-muted-foreground text-sm leading-relaxed pl-4">
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-sm">
        <span className="font-medium text-foreground">{testimonial.projectTitle}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{testimonial.projectPlatform}</span>
      </div>
    </div>
  );
}
