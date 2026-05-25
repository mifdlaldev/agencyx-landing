import { Github, Linkedin, Twitter } from "lucide-react";

const links = [
  { href: "#features", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
] as const;

const socials = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://twitter.com/", label: "Twitter", icon: Twitter },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-12">
      <div className="section-shell">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-sm font-black text-[var(--bg-primary)]">
              A
            </span>
            <span className="text-lg font-bold tracking-tight">AgencyX</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-[var(--text-muted)]">
          © 2026 AgencyX. Built for demonstration.
        </div>
      </div>
    </footer>
  );
}
