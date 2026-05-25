"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "AgencyX transformed our online presence completely. The landing page they built increased our conversion rate by 340% within the first month.",
    name: "Sarah Mitchell",
    role: "CEO, TechVenture",
  },
  {
    quote:
      "Working with AgencyX felt like having an in-house design team. They understood our vision immediately and delivered beyond expectations.",
    name: "James Chen",
    role: "Founder, GrowthLabs",
  },
  {
    quote:
      "The attention to detail and the speed of delivery was remarkable. Our new landing page has become our highest-converting asset.",
    name: "Elena Rodriguez",
    role: "CMO, ScaleUp Inc",
  },
] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Trusted by founders
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16 glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <Quote size={48} className="text-[var(--accent)]/20" />
            <div className="relative mt-6 min-h-[180px]">
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.name}
                  className={cn(
                    "transition-all duration-500",
                    i === active ? "opacity-100 translate-y-0" : "pointer-events-none absolute inset-0 opacity-0 translate-y-4",
                  )}
                >
                  <p className="text-xl leading-relaxed text-[var(--text-primary)] sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-sm font-bold text-[var(--bg-primary)]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === active ? "w-8 bg-[var(--accent)]" : "w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]",
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
