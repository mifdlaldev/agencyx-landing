"use client";

import { ArrowRight, Mail, MapPin, MessageSquare } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    message: "Tell us about your project and we will respond quickly.",
  });

  useEffect(() => setMounted(true), []);

  function updateField<K extends keyof ContactForm>(field: K, value: ContactForm[K]) {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
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
    <section id="contact" className="section-y">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <FadeIn>
          <p className="pill w-fit border-primary/15 bg-primary/5 text-primary">Project inquiry</p>
          <h2 className="heading-lg mt-5">Let’s talk about your next project.</h2>
          <p className="body-lg mt-5">
            Whether you need a new website, a web app, or a full rebrand, we are here to help.
            Fill out the form and we will get back to you within 24 hours.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              { icon: Mail, label: "Email", value: "hello@agencyx.example" },
              { icon: MapPin, label: "Location", value: "Remote worldwide" },
              { icon: MessageSquare, label: "Response", value: "Within 24 business hours" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 rounded-3xl border border-border bg-white p-4 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground">{item.label}</p>
                    <p className="font-extrabold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border bg-white p-5 shadow-soft sm:p-6" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  disabled={pending || !mounted}
                  placeholder="Your name"
                  className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  disabled={pending || !mounted}
                  placeholder="you@company.com"
                  type="email"
                  className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>
            </div>
            <Field label="Subject" error={errors.subject} className="mt-4">
              <input
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                disabled={pending || !mounted}
                placeholder="E-commerce website redesign"
                className="h-12 w-full rounded-2xl border border-border bg-muted/50 px-4 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
              />
            </Field>
            <Field label="Message" error={errors.message} className="mt-4">
              <textarea
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                disabled={pending || !mounted}
                placeholder="Tell us about your project goals, timeline, and budget..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-muted-foreground focus:border-primary"
              />
            </Field>
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
            <button type="submit" disabled={pending || !mounted} className={buttonStyles({ variant: "primary", className: "mt-4 w-full" })}>
              {pending ? "Sending..." : "Send message"}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-extrabold">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-sm font-bold text-error">{error}</span> : null}
    </label>
  );
}
