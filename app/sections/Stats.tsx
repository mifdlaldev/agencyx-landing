"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const stats = [
  { value: 120, suffix: "+", label: "launch systems" },
  { value: 48, suffix: "h", label: "prototype sprint" },
  { value: 3, suffix: "x", label: "message clarity" },
  { value: 98, suffix: "%", label: "client confidence" },
] as const;

const logos = ["Cursor", "AWS", "Databricks", "Groq", "Gamma", "HubSpot", "Browserbase", "Klarna"] as const;

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1300;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl font-extrabold tracking-[-0.06em] sm:text-6xl">
      {display}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="section-y border-y border-border bg-white/50">
      <div className="section-shell">
        <FadeIn>
          <p className="text-center text-sm font-extrabold uppercase tracking-[0.22em] text-muted-foreground">
            Trusted signal for modern AI teams
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:grid-cols-8">
            {logos.map((logo) => (
              <div key={logo} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-extrabold text-muted-foreground shadow-sm">
                {logo}
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.06}>
              <div className="rounded-[2rem] border border-border bg-background p-6 text-center shadow-soft">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
