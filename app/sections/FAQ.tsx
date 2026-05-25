"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is AgencyX?",
    answer:
      "AgencyX is a fictional SaaS launch studio landing page built as a portfolio demonstration. It showcases modern Next.js patterns, Framer Motion animations, and database-backed form handling.",
  },
  {
    question: "Can I use this template for a real project?",
    answer:
      "Yes. The code is designed to be a production-ready starting point. Replace the dummy copy with your own branding, connect a real database, and deploy.",
  },
  {
    question: "Which database does the waitlist use?",
    answer:
      "The waitlist form persists to PostgreSQL through Prisma. It works with Vercel Postgres, Supabase, or any PostgreSQL provider.",
  },
  {
    question: "Is dark mode supported out of the box?",
    answer:
      "Yes. The theme toggle respects system preference by default and persists the user choice to localStorage.",
  },
  {
    question: "How do I deploy this to Vercel?",
    answer:
      "Import the GitHub repository into Vercel, add your DATABASE_URL environment variable, and run the Prisma migration. The build script will handle the rest.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            Questions that come up often
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <FadeIn key={faq.question} delay={index * 0.04}>
                <div className="glass-panel overflow-hidden rounded-[2rem]">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="text-base font-black tracking-[-0.02em]">{faq.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      className={cn("shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-6 pb-5 text-muted leading-7 sm:px-8">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
