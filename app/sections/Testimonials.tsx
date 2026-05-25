"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "AgencyX shipped our campaign page in under a week. The motion design and pricing toggle made our launch feel premium from day one.",
    name: "Rina Santoso",
    role: "Product Lead, Nusantara SaaS",
  },
  {
    quote:
      "We needed a waitlist that actually persists to a database. The Prisma integration here is clean, testable, and deployment-ready.",
    name: "Dani Wijaya",
    role: "Engineering Manager, CloudFirst",
  },
  {
    quote:
      "The dark mode toggle and responsive layout were flawless on mobile. This is the standard we now hold our own landing pages to.",
    name: "Sari Kusuma",
    role: "Design Director, Pixelworks",
  },
] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            What teams say about AgencyX
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 glass-panel relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <div className="relative min-h-[10rem]">
                {testimonials.map((t, i) => (
                  <blockquote
                    key={t.name}
                    className={cn(
                      "transition-opacity duration-500",
                      i === active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
                    )}
                    aria-hidden={i !== active}
                  >
                    <Quote aria-hidden="true" size={32} className="text-brand/40" />
                    <p className="mt-4 text-lg leading-8 text-ink">{t.quote}</p>
                    <footer className="mt-6 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-sm font-black text-brand-ink dark:text-brand">
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-muted">{t.role}</p>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="flex items-end gap-2 lg:flex-col">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/55 text-ink transition hover:border-brand hover:bg-brand-soft dark:bg-white/[0.06]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/55 text-ink transition hover:border-brand hover:bg-brand-soft dark:bg-white/[0.06]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-2" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-brand" : "w-2 bg-line hover:bg-muted",
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
