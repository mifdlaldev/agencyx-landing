"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What makes AgencyX different from other agencies?",
    answer:
      "We specialize exclusively in high-converting landing pages. Our team combines conversion rate optimization expertise with cutting-edge design and development, ensuring every page we build is optimized for results from day one.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most landing pages are delivered within 48 hours from kickoff. More complex projects with custom integrations may take 5-7 business days. We always provide a clear timeline before starting.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. All our plans include post-launch support. Growth and Enterprise clients get priority support with faster response times. We also offer monthly retainer packages for continuous optimization.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer:
      "Absolutely. We integrate with CRMs, email marketing platforms, analytics tools, payment processors, and custom APIs. If you have specific requirements, our Enterprise plan covers custom integrations.",
  },
  {
    question: "What is your revision policy?",
    answer:
      "We include 2-5 revision rounds depending on your plan. Revisions are typically turned around within 24 hours. Our goal is to get it right, not to limit your ability to refine the final product.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-y border-[var(--border-subtle)] py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <FadeIn>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Questions? Answers.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Everything you need to know about working with us.
            </p>
          </FadeIn>

          <div className="space-y-0">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <FadeIn key={faq.question} delay={index * 0.05}>
                  <div className="border-b border-[var(--border-subtle)]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    >
                      <span className="text-base font-semibold">{faq.question}</span>
                      <span className="shrink-0 text-[var(--text-muted)]">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="pb-6 leading-relaxed text-[var(--text-secondary)]">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
