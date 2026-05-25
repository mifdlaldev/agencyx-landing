"use client";

import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

type Plan = {
  id: "starter" | "growth" | "enterprise";
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  badge?: string;
  features: readonly string[];
};

const billingOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly", description: "Two months included" },
] as const;

const plans: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "A polished landing page or brochure site to establish your online presence.",
    monthly: 499,
    yearly: 4990,
    features: ["Single-page website", "Responsive design", "Contact form integration", "SEO fundamentals", "Launch support"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "A multi-page website with CMS, blog, and conversion tools for growing teams.",
    monthly: 1299,
    yearly: 12990,
    badge: "Most popular",
    features: ["Multi-page website", "CMS & blog setup", "Analytics integration", "Performance optimization", "Priority support", "3 revision rounds"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom web applications, dashboards, and platforms built for scale.",
    monthly: null,
    yearly: null,
    features: ["Custom web application", "Database & API design", "Authentication & security", "Ongoing maintenance", "Dedicated team"],
  },
] as const;

function priceFor(plan: Plan, billing: Billing) {
  if (plan.monthly === null) return "Custom";
  const value = billing === "monthly" ? plan.monthly : plan.yearly;
  return `$${value}`;
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="section-y bg-white/55">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-3xl">
            <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">
              <Sparkles aria-hidden="true" size={14} />
              Transparent pricing
            </p>
            <h2 className="heading-lg mt-5">Pricing that scales with your project.</h2>
            <p className="body-lg mt-5">
              Clear packages designed for startups, growing businesses, and enterprises that need
              reliable delivery without hidden costs.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Toggle label="Billing cadence" options={billingOptions} value={billing} onChange={(value) => setBilling(value as Billing)} />
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] border p-6 shadow-soft transition duration-300 hover:-translate-y-1",
                  plan.id === "growth"
                    ? "border-primary/30 bg-foreground text-white shadow-[0_34px_120px_-65px_rgba(30,64,237,0.85)]"
                    : "border-border bg-white",
                )}
              >
                {plan.badge ? (
                  <span className="mb-5 w-fit rounded-full bg-lime px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-foreground">
                    {plan.badge}
                  </span>
                ) : null}
                <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{plan.name}</h3>
                <p className={cn("mt-3 min-h-16 leading-7", plan.id === "growth" ? "text-white/65" : "text-muted-foreground")}>{plan.description}</p>
                <div className="mt-7" data-testid={`price-${plan.id}`}>
                  <span className="text-5xl font-extrabold tracking-[-0.07em]">{priceFor(plan, billing)}</span>
                  {plan.monthly !== null ? (
                    <span className={cn("ml-2 text-sm font-bold", plan.id === "growth" ? "text-white/55" : "text-muted-foreground")}>
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={cn("flex gap-3 text-sm", plan.id === "growth" ? "text-white/72" : "text-muted-foreground")}>
                      <Check aria-hidden="true" size={17} className={cn("mt-0.5 shrink-0", plan.id === "growth" ? "text-lime" : "text-primary")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={buttonStyles({
                    variant: plan.id === "growth" ? "secondary" : "outline",
                    className: "mt-8 w-full",
                  })}
                >
                  {plan.monthly === null ? "Talk to sales" : "Start this plan"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
