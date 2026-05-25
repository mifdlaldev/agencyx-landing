"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What services does AgencyX offer?",
    answer:
      "We specialize in custom web development, UI/UX design, full-stack applications, and digital strategy. From landing pages to complex platforms, we handle the entire build process.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A landing page usually takes 1–2 weeks. A full website with CMS takes 3–4 weeks. Custom web applications depend on scope, but we always provide a clear timeline before starting.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes. We work with clients worldwide through async updates, scheduled calls, and shared project dashboards. Remote collaboration is built into our process.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern, proven stacks: Next.js and React for frontend, Node.js and PostgreSQL for backend, and cloud platforms like Vercel and AWS for deployment.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-y bg-white/55">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <FadeIn>
          <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">FAQ</p>
          <h2 className="heading-lg mt-5">Questions before the next build.</h2>
          <p className="body-lg mt-5">Clear answers about our process, timeline, and how we work.</p>
        </FadeIn>

        <div className="rounded-[2rem] border border-border bg-white p-2 shadow-soft">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn key={faq.question} delay={index * 0.04}>
                <div className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-5 text-left transition hover:bg-muted"
                  >
                    <span className="text-base font-extrabold tracking-[-0.02em]">{faq.question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                      {isOpen ? <Minus aria-hidden="true" size={16} /> : <Plus aria-hidden="true" size={16} />}
                    </span>
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 leading-7 text-muted-foreground">{faq.answer}</p>
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
