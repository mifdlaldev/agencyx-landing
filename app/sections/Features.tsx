import { AlertTriangle, ArrowRight, BrainCircuit, Boxes, CheckCircle2, LockKeyhole, Network, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedBeam } from "@/components/effects/AnimatedBeam";
import { FadeIn } from "@/components/motion/FadeIn";

const features: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}> = [
  {
    title: "AI-native positioning",
    description: "Turn raw founder notes into concise hero copy, proof points, and CTA architecture that reads like a polished product launch.",
    icon: BrainCircuit,
    className: "lg:col-span-2",
  },
  {
    title: "Bento product storytelling",
    description: "Feature grids, use cases, and flows that make complex services feel simple.",
    icon: Boxes,
    className: "",
  },
  {
    title: "Conversion-ready forms",
    description: "Waitlists and contact flows with validation, API boundaries, and database persistence.",
    icon: Workflow,
    className: "",
  },
  {
    title: "Trust and proof systems",
    description: "Stats, logos, testimonials, and dark enterprise panels that make your site feel credible fast.",
    icon: ShieldCheck,
    className: "lg:col-span-2",
  },
] as const;

const risks = [
  { icon: AlertTriangle, title: "Unclear offer", copy: "Visitors leave before they understand why you exist." },
  { icon: LockKeyhole, title: "Weak trust", copy: "No proof, no systems, no confidence for decision makers." },
  { icon: Network, title: "No launch loop", copy: "Forms, data, and follow-up are disconnected from the page." },
] as const;

export function Features() {
  return (
    <section id="features" className="section-y">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">
            <Sparkles aria-hidden="true" size={14} />
            Platform design system
          </p>
          <h2 className="heading-lg mt-5">
            Everything you need to look credible before the sales call.
          </h2>
          <p className="body-lg mt-5">
            AgencyX blends technical product design, persuasive landing page copy, and AI-ready
            interaction patterns into one cohesive launch surface.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={index * 0.06} className={feature.className}>
                <div className="bento-card h-full min-h-[18rem] overflow-hidden">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Icon aria-hidden="true" size={23} />
                      </div>
                      <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.045em]">{feature.title}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">{feature.description}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-extrabold text-primary">
                      Learn how
                      <ArrowRight aria-hidden="true" size={16} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.12} className="mt-6">
          <div className="dark-panel dark-grid relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <AnimatedBeam className="right-8 top-10 opacity-45" variant="cyan" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200/80">Runlayer-inspired control</p>
                <h3 className="mt-4 text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
                  Stop shipping pages that leak trust.
                </h3>
                <p className="mt-5 text-lg leading-8 text-white/65">
                  A great agency site has to communicate speed, safety, taste, and business impact. This redesign makes those signals visible in every section.
                </p>
              </div>
              <div className="grid gap-3">
                {risks.map((risk, index) => {
                  const Icon = risk.icon;
                  return (
                    <div key={risk.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                      <div className="flex items-start gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-foreground">
                          {index === 2 ? <CheckCircle2 aria-hidden="true" size={19} /> : <Icon aria-hidden="true" size={19} />}
                        </span>
                        <div>
                          <h4 className="font-extrabold">{risk.title}</h4>
                          <p className="mt-1 text-sm leading-6 text-white/60">{risk.copy}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
