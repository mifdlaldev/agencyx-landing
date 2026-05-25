"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    description: "Perfect for early-stage startups testing the waters.",
    monthly: 499,
    yearly: 4990,
    features: ["Single landing page", "Mobile responsive", "Basic analytics", "2 revision rounds"],
    popular: false,
  },
  {
    id: "growth" as const,
    name: "Growth",
    description: "For businesses ready to scale their conversion engine.",
    monthly: 1299,
    yearly: 12990,
    popular: true,
    features: [
      "Up to 3 landing pages",
      "A/B testing setup",
      "Database integration",
      "Priority support",
      "5 revision rounds",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    description: "Custom solutions for high-volume organizations.",
    monthly: null,
    yearly: null,
    features: [
      "Unlimited pages",
      "Dedicated team",
      "Custom integrations",
      "24/7 support",
      "Unlimited revisions",
    ],
    popular: false,
  },
] as const;

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="border-y border-[var(--border-subtle)] py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Choose the plan that fits your stage. Upgrade or downgrade anytime.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition",
                  billing === "monthly"
                    ? "bg-[var(--accent)] text-[var(--bg-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition",
                  billing === "yearly"
                    ? "bg-[var(--accent)] text-[var(--bg-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                Yearly
                <span className="ml-1.5 text-xs opacity-80">-17%</span>
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.1}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300",
                  plan.popular
                    ? "border-[var(--accent)]/30 bg-gradient-to-b from-[var(--accent)]/5 to-transparent"
                    : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-glow)]",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                )}
                {plan.popular && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{plan.description}</p>
                <div className="mt-6" data-testid={`price-${plan.id}`}>
                  {plan.monthly === null ? (
                    <span className="font-display text-4xl font-bold">Custom</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold">
                        ${billing === "monthly" ? plan.monthly : plan.yearly}
                      </span>
                      <span className="text-[var(--text-muted)]">/{billing === "monthly" ? "mo" : "yr"}</span>
                    </div>
                  )}
                </div>
                <ul className="mt-8 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition",
                    plan.popular
                      ? "glow-button"
                      : "outline-button",
                  )}
                >
                  {plan.monthly === null ? "Contact Sales" : "Get Started"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
