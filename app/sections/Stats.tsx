"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 48, suffix: "h", label: "Avg. Turnaround" },
  { value: 3, suffix: "x", label: "Avg. Conversion Lift" },
] as const;

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
      {display}
      <span className="text-[var(--accent)]">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="border-b border-[var(--border-subtle)] py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
