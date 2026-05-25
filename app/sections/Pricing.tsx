"use client";

import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

type Plan = {
  id: "free" | "pro" | "enterprise";
  name: string;
  summary: string;
  monthly: number | null;
  yearly: number | null;
  badge?: string;
  features: readonly string[];
};

const billingOptions = [
  { value: "monthly", label: "Monthly billing" },
  { value: "yearly", label: "Yearly billing", description: "Two months included" },
] as const;

const plans: readonly Plan[] = [
  {
    id: "free",
    name: "Free",
    summary: "Validate demand with a polished launch page.",
    monthly: 0,
    yearly: 0,
    features: ["One-page launch site", "Core animation system", "Basic waitlist capture"],
  },
  {
    id: "pro",
    name: "Pro",
    summary: "Run a sharper campaign with richer conversion cues.",
    monthly: 29,
    yearly: 290,
    badge: "Most picked",
    features: ["Everything in Free", "Pricing experiments", "Priority deployment checklist", "Database-backed leads"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    summary: "Custom launch operations for complex teams.",
    monthly: null,
    yearly: null,
    features: ["Custom launch system", "Security and compliance review", "Dedicated rollout support"],
  },
] as const;

function formatPrice(plan: Plan, billing: Billing) {
  if (plan.monthly === null) {
    return "Custom";
  }

  return `$${billing === "monthly" ? plan.monthly : plan.yearly}`;
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Simple pricing for sharp launches
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Dummy tiers for portfolio demonstration. Toggle billing to inspect how the interface handles plan state.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Toggle
              label="Billing cadence"
              options={billingOptions}
              value={billing}
              onChange={(value) => setBilling(value as Billing)}
              disabled={!mounted}
            />
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.08}>
              <Card
                interactive
                className={cn(
                  "relative flex h-full flex-col overflow-hidden",
                  plan.id === "pro" && "border-brand bg-brand-soft/70 dark:bg-brand-soft/35",
                )}
              >
                {plan.badge ? (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-canvas dark:bg-brand dark:text-brand-ink">
                    <Sparkles aria-hidden="true" size={13} />
                    {plan.badge}
                  </span>
                ) : null}
                <div className="pr-24">
                  <h3 className="text-2xl font-black tracking-[-0.04em]">{plan.name}</h3>
                  <p className="mt-3 min-h-14 leading-7 text-muted">{plan.summary}</p>
                </div>
                <div className="mt-8">
                  <p className="flex items-end gap-2" data-testid={`price-${plan.id}`}>
                    <span className="font-display text-5xl font-black tracking-[-0.06em]">{formatPrice(plan, billing)}</span>
                    {plan.monthly === null ? null : (
                      <span className="pb-2 text-sm font-bold text-muted">/{billing === "monthly" ? "mo" : "yr"}</span>
                    )}
                  </p>
                  {billing === "yearly" && plan.monthly !== null ? (
                    <p className="mt-2 text-sm font-bold text-brand">Two months included in the yearly plan.</p>
                  ) : null}
                </div>
                <ul className="mt-8 space-y-3 text-sm text-muted">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={buttonStyles({
                    className: "mt-8 w-full",
                    variant: plan.id === "pro" ? "primary" : "outline",
                  })}
                >
                  Choose {plan.name}
                </a>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
