import { DatabaseZap, Gauge, Rocket, SplitSquareHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";

const features: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Launch-ready pages",
    description: "Hero, proof points, pricing, and waitlist sections are composed for a fast SaaS launch story.",
    icon: Rocket,
  },
  {
    title: "Smooth animations",
    description: "Framer Motion reveal wrappers keep movement intentional and reduce-motion friendly.",
    icon: Gauge,
  },
  {
    title: "Conversion-focused pricing",
    description: "Monthly and yearly billing paths make pricing decisions visible without extra navigation.",
    icon: SplitSquareHorizontal,
  },
  {
    title: "Database-backed waitlist",
    description: "A Prisma route handler validates submissions before persisting launch demand.",
    icon: DatabaseZap,
  },
] as const;

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow">Feature stack</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            What ships with AgencyX
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            The MVP is intentionally focused: the pieces a recruiter or client can inspect quickly, wired with the
            same boundaries a real deployment needs.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <FadeIn key={feature.title} delay={index * 0.06}>
                <Card interactive className="h-full">
                  <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-ink dark:text-brand">
                    <Icon aria-hidden="true" size={24} />
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.03em]">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{feature.description}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
