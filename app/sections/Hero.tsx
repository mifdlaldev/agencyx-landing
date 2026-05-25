import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";

const proofPoints = ["7-day launch surface", "Prisma waitlist", "Motion-first storytelling"] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] opacity-70 launch-grid" aria-hidden="true" />
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <FadeIn className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-bold text-muted shadow-sm backdrop-blur dark:bg-white/[0.06]">
            <Sparkles aria-hidden="true" size={16} className="text-ember" />
            Built for lean teams with loud launches
          </div>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.07em] text-ink sm:text-6xl lg:text-7xl">
            <span className="text-reveal block">Launch campaigns before the market moves</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            AgencyX is a fictional SaaS launch studio landing page: sharp positioning, kinetic sections,
            pricing experiments, and a waitlist that is ready for a real PostgreSQL database.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#waitlist" className={buttonStyles({ size: "lg", variant: "primary" })}>
              Request early access
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#features" className={buttonStyles({ size: "lg", variant: "outline" })}>
              See what ships
            </a>
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-muted sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-line bg-white/45 px-4 py-3 dark:bg-white/[0.04]">
                <dt className="sr-only">Launch proof point</dt>
                <dd className="font-bold text-ink">{point}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.15} className="relative">
          <div className="glass-panel mesh-bg rounded-[2.5rem] p-5 sm:p-7">
            <div className="rounded-[2rem] border border-line bg-canvas/70 p-5 shadow-lift dark:bg-surface/72">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-muted">Launch room</p>
                  <p className="font-display text-3xl font-black tracking-[-0.06em]">Q3 campaign</p>
                </div>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-ink dark:text-brand">
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {["Positioning", "Motion pass", "Pricing test", "Waitlist sync"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-line bg-white/55 p-4 dark:bg-white/[0.05]">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-black text-canvas dark:bg-brand dark:text-brand-ink">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{item}</p>
                      <div className="mt-2 h-2 rounded-full bg-line">
                        <div className="h-2 rounded-full bg-brand" style={{ width: `${92 - index * 14}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
