"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "AgencyX made our service look like a real AI product. Recruiters noticed the craft, and prospects finally understood what we sell.",
    name: "Sarah Mitchell",
    role: "Founder, SignalForge",
  },
  {
    quote: "The page feels like an actual platform demo, not another agency template. The bento sections and forms gave us immediate credibility.",
    name: "James Chen",
    role: "Product Lead, Northstar Labs",
  },
  {
    quote: "Fast, polished, and technical. We used the site as the centerpiece for investor intros and client outreach.",
    name: "Elena Rodriguez",
    role: "Studio Director, LayerWorks",
  },
] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="section-y">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">Customer signal</p>
          <h2 className="heading-lg mt-5">Loved by founders who need trust fast.</h2>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-4 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.45fr]">
              <div className="rounded-[1.75rem] bg-foreground p-6 text-white sm:p-10 dark-grid">
                <Quote aria-hidden="true" size={38} className="text-white/25" />
                <div className="relative mt-8 min-h-[15rem]">
                  {testimonials.map((item, index) => (
                    <blockquote
                      key={item.name}
                      aria-hidden={active !== index}
                      className={cn(
                        "transition duration-500",
                        active === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
                      )}
                    >
                      <p className="text-2xl font-extrabold leading-snug tracking-[-0.05em] sm:text-4xl">
                        “{item.quote}”
                      </p>
                      <footer className="mt-8 flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-extrabold text-foreground">
                          {item.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-extrabold">{item.name}</p>
                          <p className="text-sm text-white/55">{item.role}</p>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActive((index) => (index === 0 ? testimonials.length - 1 : index - 1))}
                    aria-label="Previous testimonial"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((index) => (index === testimonials.length - 1 ? 0 : index + 1))}
                    aria-label="Next testimonial"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>
              <div className="grid gap-3">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "rounded-[1.5rem] border p-5 text-left transition",
                      active === index ? "border-primary/30 bg-primary/5" : "border-border bg-muted/50 hover:bg-muted",
                    )}
                  >
                    <p className="font-extrabold">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
