import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export function Hero() {
  return (
    <section
      id="top"
      className="aurora-bg relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text-secondary)] backdrop-blur-sm">
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span>Premium digital experiences</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            We craft digital
            <br />
            <span className="gradient-text">experiences</span>
            <br />
            that convert
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            AgencyX is a forward-thinking digital agency specializing in stunning landing pages,
            conversion-focused design, and modern web experiences that drive real results.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="glow-button inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold">
              Start your project
              <ArrowRight size={18} />
            </a>
            <a href="#features" className="outline-button inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold">
              View our services
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Stripe", "Notion", "Figma", "Vercel", "Linear"].map((brand) => (
              <span key={brand} className="text-sm font-semibold tracking-wide text-[var(--text-muted)]">
                {brand}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
    </section>
  );
}
