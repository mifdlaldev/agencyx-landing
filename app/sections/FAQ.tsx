"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What makes AgencyX different from a normal portfolio site?",
    answer:
      "The page is designed like a technical SaaS product: clear positioning, proof, bento feature systems, conversion forms, and real API/database boundaries. It signals both frontend taste and engineering reliability.",
  },
  {
    question: "Can this design still work for freelance clients?",
    answer:
      "Yes. The content stays agency-oriented, but the UI language borrows from high-end AI SaaS references so clients see a premium, modern, and commercially useful result.",
  },
  {
    question: "Does the redesign change the database or API?",
    answer:
      "No. The waitlist and contact APIs remain intact. The redesign focuses on presentation, component quality, and conversion flow while preserving existing behavior.",
  },
  {
    question: "Why use Plus Jakarta Sans?",
    answer:
      "It is readable, modern, and slightly heavier than a neutral default font. It makes headings feel bold without sacrificing clarity in body copy and forms.",
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
          <p className="body-lg mt-5">Clear answers for recruiters, clients, and anyone reviewing the project.</p>
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
