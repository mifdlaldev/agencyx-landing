import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Platform" },
      { href: "#stats", label: "Proof" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#testimonials", label: "Customers" },
      { href: "#blog", label: "Resources" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Convert",
    links: [
      { href: "#waitlist", label: "Waitlist" },
      { href: "#contact", label: "Contact" },
    ],
  },
] as const;

const socials = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://twitter.com/", label: "Twitter", icon: Twitter },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="section-shell py-8">
        <div className="dark-panel dark-grid p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200/80">Ready to ship better?</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
                Turn your portfolio into a premium product signal.
              </h2>
            </div>
            <a href="#contact" className={buttonStyles({ variant: "secondary", size: "lg", className: "shrink-0" })}>
              Book a build
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5 font-extrabold tracking-[-0.03em]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-sm text-white">AX</span>
              <span className="text-xl">AgencyX</span>
            </a>
            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              A fictional but production-grade AI SaaS agency landing page built to demonstrate design taste, frontend craft, and backend boundaries.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-muted-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    <Icon aria-hidden="true" size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-foreground">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm font-bold text-muted-foreground transition hover:text-primary">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 text-sm font-bold text-muted-foreground">
          © 2026 AgencyX. Dummy brand, real implementation.
        </div>
      </div>
    </footer>
  );
}
