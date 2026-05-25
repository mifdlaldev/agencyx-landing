"use client";

import { ArrowRight, Mail, MessageSquare, Send, User } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Enter your name."),
  email: z.string().email("Enter a valid work email."),
  subject: z.string().min(1, "Enter a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;
type Status = "idle" | "error" | "success";

export function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{ type: Status; message: string }>({
    type: "idle",
    message: "Fill the form below to get in touch.",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function updateField<K extends keyof ContactForm>(field: K, value: ContactForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus({ type: "error", message: "Please fix the errors above." });
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
      const message = payload?.message ?? "Unable to send your message right now.";

      if (!response.ok) {
        setStatus({ type: "error", message });
        return;
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setStatus({ type: "success", message });
    } catch {
      setStatus({ type: "error", message: "Unable to send your message right now." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <FadeIn>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] sm:text-5xl">
            Get in touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Have a question or want to work together? Drop a message below. This form validates with
            Zod before submission.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink dark:text-brand">
                <Mail aria-hidden="true" size={20} />
              </div>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-sm text-muted">hello@agencyx.example</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-ink dark:text-brand">
                <MessageSquare aria-hidden="true" size={20} />
              </div>
              <div>
                <p className="font-bold">Response time</p>
                <p className="text-sm text-muted">Within 24 business hours</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-black">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    disabled={pending || !mounted}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby="contact-status"
                    className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                    placeholder="Ari Builder"
                  />
                  {errors.name ? <p className="mt-1 text-sm font-bold text-ember">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-black">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={pending || !mounted}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby="contact-status"
                    className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                    placeholder="you@company.com"
                  />
                  {errors.email ? <p className="mt-1 text-sm font-bold text-ember">{errors.email}</p> : null}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-sm font-black">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  disabled={pending || !mounted}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby="contact-status"
                  className="mt-2 h-12 w-full rounded-2xl border border-line bg-white/72 px-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                  placeholder="Project inquiry"
                />
                {errors.subject ? <p className="mt-1 text-sm font-bold text-ember">{errors.subject}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-black">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  disabled={pending || !mounted}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby="contact-status"
                  className="mt-2 w-full resize-none rounded-2xl border border-line bg-white/72 px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30 dark:bg-white/[0.06]"
                  placeholder="Tell us about your project..."
                />
                {errors.message ? <p className="mt-1 text-sm font-bold text-ember">{errors.message}</p> : null}
              </div>

              <p
                id="contact-status"
                role="status"
                aria-live="polite"
                className={cn(
                  "rounded-2xl border px-4 py-3 text-sm font-bold",
                  status.type === "success"
                    ? "border-brand/50 bg-brand-soft text-brand-ink dark:text-brand"
                    : status.type === "error"
                      ? "border-ember/50 bg-ember/10 text-ink"
                      : "border-line bg-white/45 text-muted dark:bg-white/[0.04]",
                )}
              >
                {status.message}
              </p>

              <Button type="submit" size="lg" className="w-full" disabled={pending || !mounted}>
                {pending ? "Sending..." : "Send message"}
                <Send aria-hidden="true" size={18} />
              </Button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
