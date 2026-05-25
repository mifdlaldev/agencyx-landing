import { BarChart3, Layers, Palette, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const features: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Conversion Design",
    description: "Landing pages engineered to turn visitors into customers through data-driven design decisions.",
    icon: BarChart3,
  },
  {
    title: "Rapid Development",
    description: "Ship in days, not months. Our streamlined process gets your page live while competitors are still planning.",
    icon: Zap,
  },
  {
    title: "Visual Systems",
    description: "Cohesive design systems that scale. From color palettes to component libraries, everything stays consistent.",
    icon: Palette,
  },
  {
    title: "Full-Stack Integration",
    description: "Database-backed forms, API routes, and third-party integrations wired directly into your landing page.",
    icon: Layers,
  },
] as const;

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">Our Services</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Everything you need to{" "}
            <span className="gradient-text">launch fast</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            From strategy to deployment, we handle every aspect of your digital presence so you can
            focus on growing your business.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={index * 0.08}>
                <div className="glass-card group h-full rounded-2xl p-8 transition-all duration-300 hover:border-[var(--border-glow)]">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 text-[var(--accent)]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
