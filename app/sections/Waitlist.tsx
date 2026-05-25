"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
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
    message: "Join 2,000+ founders on the waitlist.",
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
    setStatus({ type: "idle", message: "Joining the waitlist..." });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, plan: "pro" }),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      const message = payload?.message ?? "Something went wrong. Please try again.";

      if (!response.ok) {
        setStatus({ type: "error", message });
        return;
      }

      setName("");
      setEmail("");
      setStatus({ type: "success", message });
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="waitlist" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="glass-card mx-auto max-w-2xl rounded-3xl p-8 sm:p-12">
          <FadeIn className="text-center">
            <p className="eyebrow">Early Access</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Join the waitlist
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Be the first to know when we open slots for new projects.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  id="wl-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={pending || !mounted}
                  className="h-12 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                  placeholder="Your name"
                />
                <input
                  id="wl-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={pending || !mounted}
                  className="h-12 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                  placeholder="you@company.com"
                />
              </div>
              <button
                type="submit"
                disabled={pending || !mounted}
                className="glow-button flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {pending ? "Joining..." : "Join waitlist"}
                <ArrowRight size={16} />
              </button>
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "rounded-xl px-4 py-3 text-center text-sm",
                  status.type === "success"
                    ? "bg-[var(--success)]/10 text-[var(--success)]"
                    : status.type === "error"
                      ? "bg-[var(--error)]/10 text-[var(--error)]"
                      : "text-[var(--text-muted)]",
                )}
              >
                {status.message}
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
