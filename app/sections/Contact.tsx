"use client";

import { ArrowRight, Mail, MapPin } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
type Status = "idle" | "error" | "success";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{ type: Status; message: string }>({
    type: "idle",
    message: "We typically respond within 24 hours.",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function updateField<K extends keyof typeof form>(field: K, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof form;
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus({ type: "error", message: "Please fix the errors below." });
      return;
    }

    setPending(true);
    setStatus({ type: "idle", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      const message = payload?.message ?? "Something went wrong.";

      if (!response.ok) {
        setStatus({ type: "error", message });
        return;
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setStatus({ type: "success", message });
    } catch {
      setStatus({ type: "error", message: "Something went wrong." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <FadeIn>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s work together
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Have a project in mind? We&apos;d love to hear about it. Drop us a message and we&apos;ll get
              back to you within 24 hours.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Email</p>
                  <p className="font-medium">hello@agencyx.example</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Location</p>
                  <p className="font-medium">Remote Worldwide</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    disabled={pending || !mounted}
                    className="h-12 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1.5 text-sm text-[var(--error)]">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={pending || !mounted}
                    className="h-12 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-[var(--error)]">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  disabled={pending || !mounted}
                  className="h-12 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                  placeholder="Project inquiry"
                />
                {errors.subject && <p className="mt-1.5 text-sm text-[var(--error)]">{errors.subject}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  disabled={pending || !mounted}
                  className="w-full resize-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="mt-1.5 text-sm text-[var(--error)]">{errors.message}</p>}
              </div>
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "rounded-xl px-4 py-3 text-sm",
                  status.type === "success"
                    ? "bg-[var(--success)]/10 text-[var(--success)]"
                    : status.type === "error"
                      ? "bg-[var(--error)]/10 text-[var(--error)]"
                      : "text-[var(--text-muted)]",
                )}
              >
                {status.message}
              </p>
              <button
                type="submit"
                disabled={pending || !mounted}
                className="glow-button flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-60"
              >
                {pending ? "Sending..." : "Send message"}
                <ArrowRight size={16} />
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
