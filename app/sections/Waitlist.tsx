"use client";

import { ArrowRight, DatabaseZap, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "error" | "success";

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{ type: Status; message: string }>({
    type: "idle",
    message: "Tell us about your project and we will get back to you within 24 hours.",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }

    setPending(true);
    setStatus({ type: "idle", message: "Submitting your request..." });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, plan: "pro" }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      const message = payload?.message ?? "Unable to submit right now.";

      if (!response.ok) {
        setStatus({ type: "error", message });
        return;
      }

      setName("");
      setEmail("");
      setStatus({ type: "success", message });
    } catch {
      setStatus({ type: "error", message: "Unable to submit right now." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="waitlist" className="section-y">
      <div className="section-shell">
        <div className="dark-panel dark-grid overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn>
              <p className="pill w-fit border-white/10 bg-white/10 text-white">
                <Sparkles aria-hidden="true" size={14} />
                Start your project
              </p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Ready to build something great?
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                Share your project details and we will respond with a clear timeline,
                scope, and next steps within one business day.
              </p>
              <div className="mt-8 flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-foreground">
                  <DatabaseZap aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="font-extrabold">Real project tracking</p>
                  <p className="mt-1 text-sm leading-6 text-white/55">Every inquiry is logged and tracked. You will never wonder where your project stands.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white p-4 text-foreground shadow-soft sm:p-6" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-extrabold">Name</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      disabled={pending || !mounted}
                      placeholder="Your name"
                      autoComplete="name"
                      className="mt-2 h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-extrabold">Email</span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={pending || !mounted}
                      placeholder="you@company.com"
                      type="email"
                      autoComplete="email"
                      className="mt-2 h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={pending || !mounted}
                  className={buttonStyles({ variant: "primary", className: "mt-4 w-full" })}
                >
                  {pending ? "Submitting..." : "Get a quote"}
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "mt-4 rounded-2xl px-4 py-3 text-sm font-bold",
                    status.type === "success"
                      ? "bg-success/10 text-success"
                      : status.type === "error"
                        ? "bg-error/10 text-error"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {status.message}
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
