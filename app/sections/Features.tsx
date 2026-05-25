import { AlertTriangle, ArrowRight, Boxes, CheckCircle2, Code2, LockKeyhole, Network, Palette, ShieldCheck, Sparkles, Workflow } from "lucide-react";
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
    title: "Custom web development",
    description: "From landing pages to complex web apps, we build fast, scalable solutions using modern frameworks like Next.js, React, and Node.js.",
    icon: Code2,
    className: "lg:col-span-2",
  },
  {
    title: "UI/UX design systems",
    description: "Pixel-perfect interfaces with cohesive design systems that make your product feel polished and professional from day one.",
    icon: Palette,
    className: "",
  },
  {
    title: "Full-stack applications",
    description: "End-to-end development with real databases, APIs, authentication, and everything your app needs to go live.",
    icon: Workflow,
    className: "",
  },
  {
    title: "Brand & digital strategy",
    description: "We align design, messaging, and user flow so every visitor understands your value within the first few seconds.",
    icon: ShieldCheck,
    className: "lg:col-span-2",
  },
] as const;

const risks = [
  { icon: AlertTriangle, title: "Slow delivery", copy: "Deadlines slip and opportunities are missed when development lacks structure." },
  { icon: LockKeyhole, title: "Poor UX", copy: "Confusing interfaces drive visitors away before they become customers." },
  { icon: Network, title: "No maintenance", copy: "Launch is just the start. Without support, your product quickly becomes outdated." },
] as const;

export function Features() {
  return (
    <section id="features" className="section-y">
      <div className="section-shell">
        <FadeIn className="max-w-3xl">
          <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">
            <Sparkles aria-hidden="true" size={14} />
            Services we deliver
          </p>
          <h2 className="heading-lg mt-5">
            Everything you need to launch and grow online.
          </h2>
          <p className="body-lg mt-5">
            AgencyX combines design, development, and strategy into a single delivery process.
            You get a team that ships fast and thinks long-term.
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
                      Learn more
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
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200/80">Why teams choose us</p>
                <h3 className="mt-4 text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
                  Stop losing customers to bad digital experiences.
                </h3>
                <p className="mt-5 text-lg leading-8 text-white/65">
                  A great agency site or product needs to communicate speed, quality, and reliability.
                  We make those signals visible in every pixel we ship.
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
