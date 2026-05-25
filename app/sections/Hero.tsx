import { ArrowUpRight, Star } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";

const trustedBy = ["Shopify", "Stripe", "Notion", "Figma", "Vercel", "Linear"] as const;

const avatars = [
  { initials: "SM", bg: "bg-rose-400" },
  { initials: "JC", bg: "bg-amber-400" },
  { initials: "ER", bg: "bg-emerald-400" },
  { initials: "AK", bg: "bg-sky-400" },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.12),transparent_50%),radial-gradient(ellipse_at_80%_20%,hsl(var(--secondary)/0.08),transparent_40%)]" />

      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <h1 className="heading-xl max-w-4xl">
            We build websites and apps that turn visitors into customers.
          </h1>
          <p className="body-lg mx-auto mt-6 max-w-2xl">
            AgencyX is a digital development studio focused on custom websites, web applications,
            and UI/UX design for teams who need fast delivery without sacrificing quality.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <a href="#contact" className={buttonStyles({ variant: "dark", size: "lg" })}>
              Get Started
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {avatars.map((avatar, i) => (
                  <span
                    key={i}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white text-xs font-extrabold text-white ${avatar.bg}`}
                  >
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-muted-foreground">Trusted by 1000+ clients</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-20 w-full">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Loved by 1000+ big and small brands around the world
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((brand) => (
              <span key={brand} className="text-lg font-extrabold text-muted-foreground/60">
                {brand}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
