"use client";

import { ArrowRight, Database } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Plan = "free" | "pro" | "enterprise";
type Status = "idle" | "error" | "success";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const planOptions: ReadonlyArray<{ value: Plan; label: string }> = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

function statusClass(status: Status) {
  if (status === "success") {
    return "border-brand/50 bg-brand-soft text-brand-ink dark:text-brand";
  }

  if (status === "error") {
    return "border-ember/50 bg-ember/10 text-ink";
  }

  return "border-line bg-white/45 text-muted dark:bg-white/[0.04]";
}

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<Plan>("pro");
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{ type: Status; message: string }>({
    type: "idle",
    message: "Complete the form to join the waitlist.",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setStatus({ type: "error", message: "Enter your name." });
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Enter a valid work email." });
      return;
    }

    setPending(true);
    setStatus({ type: "idle", message: "Saving your request..." });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, plan }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      const message = payload?.message ?? "Unable to join the waitlist right now.";

      if (!response.ok) {
        setStatus({ type: "error", message });
        return;
      }

      setName("");
      setEmail("");
      setPlan("pro");
      setStatus({ type: "success", message });
    } catch {
      setStatus({ type: "error", message: "Unable to join the waitlist right now." });
    } finally {
      setPending(false);
    }
  }
  const nameInvalid = status.type === "error" && status.message === "Enter your name.";
  const emailInvalid = status.type === "error" && status.message === "Enter a valid work email.";


  return (
    <section id="waitlist" className="py-20 sm:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <FadeIn>
          <p className="eyebrow">Waitlist</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            Reserve your launch slot
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            The form validates in the browser first, then posts to a Next.js route handler that persists through Prisma
            when a PostgreSQL `DATABASE_URL` is configured.
          </p>
          <div className="mt-8 flex items-start gap-4 rounded-[2rem] border border-line bg-white/45 p-5 dark:bg-white/[0.04]">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink dark:text-brand">
              <Database aria-hidden="true" size={22} />
            </div>
            <div>
              <h3 className="font-black tracking-[-0.02em]">Deployment-ready boundary</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                API validation paths work without a database; successful persistence requires PostgreSQL credentials.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-black">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                    placeholder="Ari Builder"
                    disabled={pending || !mounted}
                    aria-invalid={nameInvalid}
                    aria-describedby="waitlist-status"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-black">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                    placeholder="you@company.com"
                    disabled={pending || !mounted}
                    aria-invalid={emailInvalid}
                    aria-describedby="waitlist-status"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="plan" className="text-sm font-black">
                  Launch plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={plan}
                  onChange={(event) => setPlan(event.target.value as Plan)}
                  className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-surface"
                  disabled={pending || !mounted}
                  aria-describedby="waitlist-status"
                >
                  {planOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <p
                id="waitlist-status"
                role="status"
                aria-live="polite"
                className={cn("rounded-2xl border px-4 py-3 text-sm font-bold", statusClass(status.type))}
              >
                {status.message}
              </p>

              <Button type="submit" size="lg" className="w-full" disabled={pending || !mounted}>
                {pending ? "Saving..." : "Request early access"}
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
