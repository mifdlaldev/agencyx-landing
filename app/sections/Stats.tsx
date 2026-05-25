"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

const stats = [
  { value: 120, suffix: "+", label: "Landing pages shipped" },
  { value: 48, suffix: "h", label: "Average launch time" },
  { value: 98, suffix: "%", label: "Client satisfaction rate" },
  { value: 15, suffix: "K+", label: "Waitlist signups captured" },
] as const;

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (isInView) setDisplay(value);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);
      if (current !== start) {
        start = current;
        setDisplay(current);
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-black tracking-[-0.06em] sm:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">Impact numbers</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            Built for speed, trusted by teams
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            These numbers are fictional and intended to demonstrate scroll-triggered counter animations.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.06}>
              <div className="glass-panel rounded-[2.5rem] p-6 text-center">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm font-bold text-muted">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
