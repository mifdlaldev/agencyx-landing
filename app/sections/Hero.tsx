import { ArrowRight, Code2, Globe2, Palette, Sparkles } from "lucide-react";
import { AnimatedBeam } from "@/components/effects/AnimatedBeam";
import { DotGrid } from "@/components/effects/DotGrid";
import { ShinyText } from "@/components/effects/ShinyText";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";

const trustedBy = ["Shopify", "Stripe", "Notion", "Figma", "Vercel", "Linear"] as const;
const insightCards = [
  { icon: Palette, label: "Design", value: "UI/UX systems" },
  { icon: Code2, label: "Develop", value: "Full-stack apps" },
  { icon: Globe2, label: "Deploy", value: "Production ready" },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28">
      <DotGrid className="opacity-55" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.18),transparent_34rem)]" />
      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
        <FadeIn>
          <div className="pill mb-7 border-primary/20 bg-white/90 text-primary">
            <Sparkles aria-hidden="true" size={14} />
            <ShinyText>Full-service development agency</ShinyText>
          </div>
          <h1 className="heading-xl max-w-4xl">
            We build websites and apps that turn visitors into customers.
          </h1>
          <p className="body-lg mt-7 max-w-2xl">
            AgencyX is a digital development studio focused on custom websites, web applications,
            and UI/UX design for teams who need fast delivery without sacrificing quality.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={buttonStyles({ variant: "primary", size: "lg" })}>
              Start a project
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#features" className={buttonStyles({ variant: "secondary", size: "lg" })}>
              Our services
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-extrabold text-muted-foreground">
            {trustedBy.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="relative">
          <AnimatedBeam className="-left-6 top-8" />
          <AnimatedBeam className="bottom-10 right-0 rotate-180" variant="violet" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-3 shadow-[0_40px_140px_-70px_rgba(30,64,237,0.55)]">
            <div className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,#fbfbfa,#f4f2ee)] p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white">
                    <Globe2 aria-hidden="true" size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">AgencyX Dashboard</p>
                    <p className="text-xs font-semibold text-muted-foreground">Project tracking live</p>
                  </div>
                </div>
                <span className="rounded-full bg-lime/40 px-3 py-1 text-xs font-extrabold text-foreground">Active</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {insightCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <Icon aria-hidden="true" size={18} className="text-primary" />
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{card.label}</p>
                      <p className="mt-1 text-sm font-extrabold">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-3xl bg-foreground p-4 text-white dark-grid">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Latest project</p>
                  <p className="mt-2 text-lg font-extrabold tracking-[-0.04em]">
                    E-commerce platform with real-time inventory
                  </p>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-3xl font-extrabold">92%</p>
                    <p className="text-sm text-white/60">performance score</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-3xl font-extrabold">2wk</p>
                    <p className="text-sm text-white/60">delivery cycle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
