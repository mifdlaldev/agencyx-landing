import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#waitlist", label: "Waitlist" },
] as const;

const socials = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:hello@agencyx.example", label: "Email", icon: Mail },
] as const;

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line py-12">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-sm text-canvas dark:bg-brand dark:text-brand-ink">
              AX
            </span>
            <span className="text-lg tracking-[-0.03em]">AgencyX</span>
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Fictional SaaS/agency landing page built as a portfolio-ready Next.js MVP.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-bold text-muted hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/45 text-muted transition hover:border-brand hover:text-ink dark:bg-white/[0.04]"
              >
                <Icon aria-hidden="true" size={18} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="section-shell mt-8 text-sm text-muted">© 2026 AgencyX. Dummy brand, real implementation.</div>
    </footer>
  );
}
